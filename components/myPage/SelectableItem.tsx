import { useRecoilValue, useSetRecoilState } from 'recoil';

import React from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';
import { editableState, tabState } from 'recoils/myPage';

import { Achievement, Emoji } from 'types/myPageTypes';

import ModalButton from 'components/global/buttons/CloseModalButton';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ModalTitle from 'components/modals/modalParts/ModalTitle';
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
  const setModalParts = useSetRecoilState(modalPartsState);
  const setOpenModal = useSetRecoilState(openModalState);
  const handleItemClick = () => {
    if (itemType === 'emoji') return;
    const achievement = item as Achievement;
    setModalParts({
      head: <ModalTitle title={name} />,
      body: (
        <ModalPhrase>
          {
            <div className={styles.modalPhrase}>
              <img className={styles.itemImage} src={imgUrl} alt={name} />
              <div>{achievement.content}</div>
            </div>
          }
        </ModalPhrase>
      ),
      tail: (
        <ModalButton style={'basic'} color={'black'}>
          {'close'}
        </ModalButton>
      ),
    });
    setOpenModal(true);
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
    <div className={`${styles.selectableItem} ${itemStyle()}`}>
      {imgSelector()}
    </div>
  );
}
