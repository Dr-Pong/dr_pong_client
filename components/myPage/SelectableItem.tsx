import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState, tabState } from 'recoils/myPage';

import { Achievement, Emoji } from 'types/myPageTypes';

import { SelectHandler } from 'components/myPage/SelectTab';

import styles from 'styles/myPage/SelectableItem.module.scss';

export default function SelectableItem({
  itemType,
  item,
  clickHandler,
}: {
  itemType: string;
  item: Achievement | Emoji;
  clickHandler: SelectHandler | null;
}) {
  const { name, imgUrl, status } = item;
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(tabState);
  const handleItemClick = () => {
    return itemType == 'achieve' ? 'popupmodal' : 'nopopup';
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
  const imgStyle = () => {
    if (editable && tab !== 'profile' && status === 'selected') {
      return styles.selected;
    } else if (status === 'unachieved') {
      return styles.unachieved;
    }
  };
  return (
    <div className={`${styles.selectableItem} ${imgStyle()}`}>
      {editable ? (
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
          onClick={handleItemClick}
          alt={name}
        />
      )}
    </div>
  );
}
