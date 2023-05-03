import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, tabState } from 'recoils/user';

import { Achievement, Achievements, Emoji, Emojis } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import SelectableItem from 'components/myPage/SelectableItem';

import styles from 'styles/myPage/SelectTab.module.scss';

export interface SelectHandler {
  select: (item: Achievement | Emoji | null) => void;
  deselect: (item: Achievement | Emoji | null) => void;
}
export default function SelectTab({
  nickname,
  itemType,
}: {
  nickname: string;
  itemType: string;
}) {
  const queryKey = itemType === 'achieve' ? 'achievements' : 'emojis';
  const { getAll, getSelected, patchSelectables } = useMyPageQuery(
    nickname,
    queryKey
  );
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(tabState);
  const [selected, setSelected] =
    useState<(Achievement | Emoji | null)[]>(NULLARR);
  const [all, setAll] = useState<(Achievement | Emoji | null)[]>(NULLARR);
  useEffect(() => {
    if (selected === NULLARR) {
      return;
    } else if (!editable && tab === 'achieve') {
      mutate({ achievements: selected.map((item) => item?.id ?? null) });
    } else if (!editable && tab === 'emoji') {
      mutate({ emojis: selected.map((item) => item?.id ?? null) });
    }
  }, [editable]);

  const setSelectedItems = () => {
    if (itemType === 'achieve') {
      return (achievements: Achievements) => {
        setSelected(achievements.achievements);
      };
    } else {
      return (emojis: Emojis) => {
        setSelected(emojis.emojis);
      };
    }
  };
  const setAllItems = () => {
    if (itemType === 'achieve') {
      return (achievements: Achievements) => {
        setAll(achievements.achievements);
      };
    } else {
      return (emojis: Emojis) => {
        setAll(emojis.emojis.filter((i) => i?.status !== 'unachieved'));
      };
    }
  };

  const { mutate } = patchSelectables();
  const { isLoading: isSelectedLoading, isError: isSelectedError } =
    getSelected(setSelectedItems());
  const { isLoading: isAllLoading, isError: isAllError } = getAll(
    setAllItems()
  );
  if (isSelectedLoading || isAllLoading) return <div>Loading...</div>;
  if (isSelectedError || isAllError) return <div>Error...</div>;
  const clickHandler: SelectHandler = {
    select: (item: Achievement | Emoji | null) => {
      if (item === null) return;
      if (selected.includes(null) && !selected.some((i) => i?.id === item.id)) {
        const idx = selected.findIndex((i) => i === null);
        item.status = 'selected';
        selected.splice(idx, 1, item);
        setSelected([...selected]);
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
        selected.splice(idx, 1, null);
        setSelected([...selected]);
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
