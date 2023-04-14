import { useRecoilValue } from 'recoil';

import React from 'react';

import styles from 'styles/myPage/SelectableItem.module.scss';

import { Achievement, Emoji } from './SelectedItems';
import { editableState } from "../../recoils/myPage";

export default function SelectableItem({
  itemType,
  item,
}: {
  itemType: string;
  item: Achievement | Emoji;
}) {
  const editableStatus = useRecoilValue(editableState);
  const { name, imgUrl } = item;
  const handleItemClick = () => {
    return itemType == 'achieve' ? 'popupmodal' : 'nopopup';
  };
  return (
    <div className={styles.selectableItem}>
      {!editableStatus && (
        <img
          className={styles.itemImage}
          src={imgUrl}
          onClick={handleItemClick}
          alt={name}
        />
      )}
      {editableStatus && (
        <img className={styles.itemImage} src={imgUrl} alt={name} />
        /* 수정 모드 구현 */
      )}
    </div>
  );
}
