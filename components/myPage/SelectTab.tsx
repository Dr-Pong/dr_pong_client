import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';
import { useMutation, useQueries } from 'react-query';

import { editableState, tabState } from 'recoils/myPage';

import { Achievement, Emoji, PatchSelectables } from 'types/myPageTypes';

import instance from 'utils/axios';

import SelectableItem from 'components/myPage/SelectableItem';

import styles from 'styles/myPage/SelectTab.module.scss';

export interface SelectHandler {
  select: (item: Achievement | Emoji) => void;
  deselect: (item: Achievement | Emoji) => void;
}
export default function SelectTab({
  userName,
  itemType,
}: {
  userName: string;
  itemType: string;
}) {
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(tabState);
  const [selected, setSelected] = useState<Achievement[] | Emoji[]>([]);
  const [all, setAll] = useState<Achievement[] | Emoji[]>([]);
  const queryKey = itemType === 'achieve' ? 'achievements' : 'emojis';
  useEffect(() => {
    if (selected.length === 0) {
      return;
    } else if (!editable && tab === 'achieve') {
      mutate({ achievements: selected.map((item) => item.id) });
    } else if (!editable && tab === 'emoji') {
      mutate({ emojis: selected.map((item) => item.id) });
    }
  }, [editable]);
  const patchSelectables = async (
    selectables: PatchSelectables
  ): Promise<PatchSelectables> => {
    const { data } = await instance.patch<PatchSelectables>(
      `/users/${userName}/${queryKey}`,
      selectables
    );
    return data;
  };

  const { mutate } = useMutation(patchSelectables);
  const fetchSelectedItems = async (): Promise<Achievement[] | Emoji[]> => {
    const res = await instance.get(
      `/users/${userName}/${queryKey}?selected=true`
    );
    setSelected(res.data);
    return res.data;
  };
  const fetchAllItems = async (): Promise<Achievement[] | Emoji[]> => {
    const res = await instance.get(`/users/${userName}/${queryKey}`);
    const data: Achievement[] | Emoji[] = res.data;
    if (itemType === 'achieve') {
      setAll(data);
    } else if (itemType === 'emoji') {
      setAll(data.filter((i) => i.status !== 'unachieved'));
    }
    return res.data;
  };
  const queries = useQueries([
    {
      queryKey: ['selected'],
      queryFn: fetchSelectedItems,
    },
    {
      queryKey: ['item'],
      queryFn: fetchAllItems,
    },
  ]);
  const isLoading = queries.some((query) => query.isLoading);
  const isError = queries.some((query) => query.isError);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const clickHandler: SelectHandler = {
    select: (item: Achievement | Emoji) => {
      if (selected.length < 3 && !selected.some((i) => i.id === item.id)) {
        item.status = 'selected';
        setSelected([item, ...selected].sort((a, b) => a.id - b.id));
      }
    },
    deselect: (item: Achievement | Emoji) => {
      item.status = 'achieved';
      setAll(
        [...all.filter((i) => i.id !== item.id), item].sort(
          (a, b) => a.id - b.id
        )
      );
      setSelected(selected.filter((i) => i.id !== item.id));
    },
  };
  return (
    <div className={styles.selectTab}>
      <div className={styles.selectedItems}>
        {selected.map((item) => (
          <SelectableItem
            key={item.id}
            itemType={itemType}
            item={item}
            clickHandler={clickHandler}
          />
        ))}
      </div>
      <div className={styles.allItems}>
        {all.map((item) => (
          <SelectableItem
            key={item.id}
            itemType={itemType}
            item={item}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}
