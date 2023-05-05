import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState } from 'recoils/user';

import {
  AchievementsClass,
  EmojisClass,
  Selectable,
  Selectables,
} from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import SelectableItem from 'components/myPage/SelectableItem';

import styles from 'styles/myPage/SelectTab.module.scss';

export interface SelectHandler {
  select: (item: Selectable | null) => void;
  deselect: (item: Selectable | null) => void;
}
export default function SelectTab({
  nickname,
  itemType,
}: {
  nickname: string;
  itemType: string;
}) {
  const selectables = itemType === 'achieve' ? AchievementsClass : EmojisClass;
  const { getAll, getSelected, patchSelectables } = useMyPageQuery(
    nickname,
    selectables.getQuery()
  );
  const editable = useRecoilValue(editableState);
  const [selected, setSelected] = useState(new selectables([]));
  const [all, setAll] = useState(new selectables([]));
  useEffect(() => {
    if (selected.isEmpty()) {
      return;
    }
    if (!editable) {
      console.log('patching');
      mutate({ ...selected.getSelected() });
    }
  }, [editable]);

  const setSelectedItems = () => {
    return (selectables: Selectables) => {
      setSelected(selected.copyJSON(selectables).clone());
    };
  };
  const setAllItems = () => {
    return (selectables: Selectables) => {
      setAll(all.copyJSON(selectables).clone());
    };
  };
  const clickHandler: SelectHandler = {
    select: (item: Selectable | null) => {
      if (item === null) return;
      setSelected(selected.selectItem(item).clone());
    },
    deselect: (item: Selectable | null) => {
      if (item === null) return;
      setAll(all.deselectItem(item).clone());
      setSelected(selected.replaceWithNull(item).clone());
    },
  };
  const { mutate } = patchSelectables();
  const { isLoading: isSelectedLoading, isError: isSelectedError } =
    getSelected(setSelectedItems());
  const { isLoading: isAllLoading, isError: isAllError } = getAll(
    setAllItems()
  );

  if (isSelectedLoading || isAllLoading) return <div>Loading...</div>;
  if (isSelectedError || isAllError) return <div>Error...</div>;
  return (
    <div className={styles.selectTab}>
      <div className={styles.selectedItems}>
        {selected.getSelectables().map((item, i) => (
          <SelectableItem
            key={i}
            itemType={itemType}
            item={item}
            clickHandler={clickHandler}
          />
        ))}
      </div>
      <div className={styles.allItems}>
        {all.getSelectables().map((item) => (
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
