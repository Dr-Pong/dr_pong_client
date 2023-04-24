import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, tabState } from 'recoils/myPage';

import { Achievement, Emoji, PatchSelectables } from 'types/myPageTypes';

import SelectableItem from 'components/myPage/SelectableItem';

import styles from 'styles/myPage/SelectTab.module.scss';

import useMyPageQuery from 'hooks/useMyPageQuery';

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
  const queryKey = itemType === 'achieve' ? 'achievements' : 'emojis';
  const { getAll, getSelected, patchSelectables } = useMyPageQuery(
    userName,
    queryKey
  );
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(tabState);
  const [selected, setSelected] = useState<Achievement[] | Emoji[]>([]);
  const [all, setAll] = useState<Achievement[] | Emoji[]>([]);
  useEffect(() => {
    if (selected.length === 0) {
      return;
    } else if (!editable && tab === 'achieve') {
      mutate({ achievements: selected.map((item) => item.id) });
    } else if (!editable && tab === 'emoji') {
      mutate({ emojis: selected.map((item) => item.id) });
    }
  }, [editable]);
  const setAllItems = (itemType: string) => {
    if (itemType === 'achieve') {
      return setAll;
    } else {
      return (emojis: Emoji[]) => {
        setAll(emojis.filter((i) => i.status !== 'unachieved'));
      };
    }
  };
  const { mutate } = patchSelectables();
  const { isLoading: isSelectedLoading, isError: isSelectedError } =
    getSelected(setSelected);
  const { isLoading: isAllLoading, isError: isAllError } = getAll(
    setAllItems(itemType)
  );
  if (isSelectedLoading || isAllLoading) return <div>Loading...</div>;
  if (isSelectedError || isAllError) return <div>Error...</div>;
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
