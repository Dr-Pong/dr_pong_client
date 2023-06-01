import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState, profileTabState } from 'recoils/user';

import { Achievement, Emoji } from 'types/userTypes';

import useModalProvider from 'hooks/useModalProvider';

import { SelectHandler } from 'components/myPage/SelectTab';

import styles from 'styles/myPage/SelectableItem.module.scss';

type SelectableItemProps = {
  itemType: string;
  item: Achievement | Emoji | null;
  clickHandler: SelectHandler | null;
};

export default function SelectableItem({
  itemType,
  item,
  clickHandler,
}: SelectableItemProps) {
  const { name, imgUrl, status } = item ?? {
    name: 'none',
    imgUrl: 'empty',
    status: 'selected',
  };
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(profileTabState);
  const { useAchievementDetailModal } = useModalProvider();
  const handleItemClick = () => {
    if (itemType === 'emoji') return;
    const achievement = item as Achievement;
    useAchievementDetailModal(achievement);
  };

  const handleEditClick = () => {
    switch (status) {
      case 'unachieved':
        break;
      case 'achieved':
        clickHandler?.select(item);
        break;
      case 'selected':
        clickHandler?.deselect(item);
        break;
    }
  };

  const itemStyle = () => {
    if (editable && tab !== 'profile' && status === 'selected') {
      return styles.selected;
    } else if (status === 'unachieved') {
      return styles.unachieved;
    }
  };

  const imgSelector = () => {
    if (item === null) {
      return <div className={styles.empty}></div>;
    } else {
      return (
        <img
          className={styles.itemImage}
          src={imgUrl}
          alt={name}
          onClick={editable ? handleEditClick : handleItemClick}
        />
      );
    }
  };

  return <div className={itemStyle()}>{imgSelector()}</div>;
}
