import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, tabState } from 'recoils/myPage';

import { Achievement, Achievements, Emoji, Emojis } from 'types/myPageTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import SelectableItem from 'components/myPage/SelectableItem';

import styles from 'styles/myPage/SelectTab.module.scss';

export interface SelectHandler {
  select: (item: Achievement | Emoji | null) => void;
  deselect: (item: Achievement | Emoji | null) => void;
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
  const [selected, setSelected] = useState<Achievements | Emojis>(NULLARR);
  const [all, setAll] = useState<Achievements | Emojis>(NULLARR);
  useEffect(() => {
    if (selected.length === 0) {
      return;
    } else if (!editable && tab === 'achieve') {
      mutate({ achievements: selected });
    } else if (!editable && tab === 'emoji') {
      mutate({ emojis: selected });
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
    select: (item: Achievement | Emoji | null) => {
      if (item === null) return;
      if (selected.includes(null) && !selected.some((i) => i?.id === item.id)) {
        const idx = selected.findIndex((i) => i === null);
        item.status = 'selected';
        setSelected([
          ...selected.slice(0, idx),
          item,
          ...selected.slice(idx + 1),
        ]);
      }
    },
    deselect: (item: Achievement | Emoji | null) => {
      if (item === null) return;
      item.status = 'achieved';
      setAll(
        [...all.filter((i) => i?.id !== item.id), item].sort((a, b) => {
          if (a === null || b === null) return 0;
          return a.id - b.id;
        })
      );
      const idx = selected.findIndex((i) => i?.id === item?.id);
      if (idx !== -1) {
        setSelected([
          ...selected.slice(0, idx),
          null,
          ...selected.slice(idx + 1),
        ]);
      }
    },
  };
  return (
    <div className={styles.selectTab}>
      <div className={styles.selectedItems}>
        {selected.map((item, i) => (
          <SelectableItem
            key={i}
            itemType={itemType}
            item={item}
            clickHandler={clickHandler}
          />
        ))}
      </div>
      <div className={styles.allItems}>
        {all.map((item) => (
          <SelectableItem
            key={item?.id}
            itemType={itemType}
            item={item}
            clickHandler={clickHandler}
          />
        ))}
      </div>
    </div>
  );
}

const NULLARR = [null, null, null];
