import { useRecoilValue } from 'recoil';

import React from 'react';

import styles from 'styles/myPage/SelectableItem.module.scss';

import { editableState } from '../../recoils/myPage';
import { Achievement, Emoji } from './SelectedItems';

export default function SelectableItem({
  itemType,
  item,
  editableStatus,
}: {
  itemType: string,
  item: Achievement | Emoji,
  editableStatus: boolean,
}) {
  const { name, imgUrl } = item;
  return (
    <div className={styles.selectableItem}>
      {!editableStatus &&
        (itemType == 'achieve' ? (
          <img
            className={styles.itemImage}
            src={imgUrl}
            onClick={() => '설명이 담긴 모달이 켜질 것'}
            alt={name}
          />
        ) : (
          <img className={styles.itemImage} src={imgUrl} alt={name} />
        ))}
      {editableStatus && (
        <img className={styles.itemImage} src={imgUrl} alt={name} />
        /* 수정 모드 구현 */
      )}
    </div>
  );
}
