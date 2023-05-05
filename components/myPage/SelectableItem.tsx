import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState, tabState } from 'recoils/user';

import { Achievement, Emoji } from 'types/userTypes';

import useModalProvider from 'hooks/useModalProvider';

import { SelectHandler } from 'components/myPage/SelectTab';

import styles from 'styles/myPage/SelectableItem.module.scss';

export default function SelectableItem({
  itemType,
  item,
  clickHandler,
}: {
  itemType: string;
  item: Achievement | Emoji | null;
  clickHandler: SelectHandler | null;
}) {
  const { name, imgUrl, status } = item ?? {
    name: 'none',
    imgUrl: 'empty',
    status: 'selected',
  };
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(tabState);
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
      return editable ? (
        <img
          className={styles.itemImage}
          src={imgUrl}
          alt={name}
          onClick={handleEditClick}
        />
      ) : (
        <img
          className={styles.itemImage}
          src={imgUrl}
          alt={name}
          onClick={handleItemClick}
        />
      );
    }
  };

  return (
    <div className={`${styles[itemType]} ${itemStyle()}`}>{imgSelector()}</div>
  );
}
