import React from 'react';

import styles from 'styles/myPage/SelectableItem.module.scss';

import { EditableStatus } from './MyPageFrame';
import { ItemType } from './Profile';
import { Achievement, Emoji } from './SelectedItems';

export default function SelectableItem({
  itemType,
  item,
  editableStatus,
}: {
  itemType: ItemType;
  item: Achievement | Emoji;
  editableStatus: EditableStatus;
}) {
  const { name, imgUrl } = item;
  return (
    <div className={styles.selectableItem}>
      {editableStatus == EditableStatus.PLAIN && itemType == 'achieve' && (
        <img
          className={styles.itemImage}
          src={imgUrl}
          onClick={() => '설명이 담긴 모달이 켜질 것'}
          alt={name}
        />
      )}
      {editableStatus == EditableStatus.PLAIN && itemType == 'emoji' && (
        <img className={styles.itemImage} src={imgUrl} alt={name} />
      )}
      {editableStatus == EditableStatus.EDIT && (
        <img className={styles.itemImage} src={imgUrl} alt={name} />
        /* 수정 모드 구현 */
      )}
    </div>
  );
}
