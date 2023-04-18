import { useRecoilValue } from 'recoil';

import React from 'react';

import styles from 'styles/myPage/SelectableItem.module.scss';

import { editableState } from '../../recoils/myPage';
import { Achievement, Emoji } from '../../types/myPageTypes';

export default function SelectableItem({
  itemType,
  item,
}: {
  itemType: string;
  item: Achievement | Emoji;
}) {
  const editable = useRecoilValue(editableState);
  const handleItemClick = () => {
    return itemType == 'achieve' ? 'popupmodal' : 'nopopup';
  };
  const { name, imgUrl } = item;
  return (
    <div className={styles.selectableItem}>
      {!editable && (
        <img
          className={styles.itemImage}
          src={imgUrl}
          onClick={handleItemClick}
          alt={name}
        />
      )}
      {editable && (
        <img className={styles.itemImage} src={imgUrl} alt={name} />
        /* 수정 모드 구현 */
      )}
    </div>
  );
}
