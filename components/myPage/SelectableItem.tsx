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
  const itemStyle = () => {
    if (editable && tab !== 'profile' && status === 'selected') {
      return styles.selected;
    } else if (status === 'unachieved') {
      return styles.unachieved;
    }
  };

  const imgStyle = () => {
    if (item === null) return styles.empty;
    else return styles.itemImage;
  };

  const imgSelector = () => {
    if (item === null) {
      return <div className={styles.empty}></div>;
    } else {
      return editable ? (
        <img
          className={`${imgStyle()}`}
          src={imgUrl}
          alt={name}
          onClick={handleEditClick}
        />
      ) : (
        <img
          className={`${imgStyle()}`}
          src={imgUrl}
          alt={name}
          onClick={handleItemClick}
        />
      );
    }
  };

  return (
    <div className={`${styles.selectableItem} ${itemStyle()}`}>
      {imgSelector()}
    </div>
  );
}
