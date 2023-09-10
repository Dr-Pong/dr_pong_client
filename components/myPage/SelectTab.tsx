import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState } from 'recoils/user';

import {
  AchievementsClass,
  EmojisClass,
  ProfileTab,
  Selectable,
  Selectables,
} from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import SelectableItem from 'components/myPage/SelectableItem';

import styles from 'styles/myPage/SelectTab.module.scss';

export interface SelectHandler {
  select: (item: Selectable | null) => void;
  deselect: (item: Selectable | null) => void;
}

type SelectTabProps = {
  nickname: string;
  itemType: ProfileTab;
};

export default function SelectTab({ nickname, itemType }: SelectTabProps) {
  const selectables = itemType === 'achieve' ? AchievementsClass : EmojisClass;
  const { allItemsGet, selectedGet, selectablesMutationPatch } = useMyPageQuery(
    nickname,
    selectables.getQuery()
  );
  const editable = useRecoilValue(editableState);
  const [selected, setSelected] = useState(
    new selectables(Array(itemType === 'achieve' ? 3 : 4).fill(null))
  );
  const [all, setAll] = useState(new selectables(Array(10).fill(null)));
  const { mutate } = selectablesMutationPatch();

  useEffect(() => {
    if (selected.isEmpty()) {
      return;
    }
    if (!editable) {
      mutate({ ...selected.getSelected() });
    }
  }, [editable]);

  const setSelectedFromJson = () => {
    return (selectables: Selectables) => {
      setSelected(selected.copyJSON(selectables).clone());
    };
  };

  const setAllFromJSON = () => {
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

  const { isError: isSelectedError } = selectedGet(setSelectedFromJson());
  const { isError: isAllError } = allItemsGet(setAllFromJSON());

  if (isSelectedError || isAllError) return <ErrorRefresher />;

  return (
    <div className={styles.selectTabContainer}>
      <div className={`${styles.itemsWrap} ${styles[itemType]}`}>
        {selected.getSelectables().map((item, i) => (
          <SelectableItem
            key={i}
            itemType={itemType}
            item={item}
            clickHandler={clickHandler}
          />
        ))}
      </div>
      <div className={`${styles.itemsWrap} ${styles[itemType]}`}>
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
