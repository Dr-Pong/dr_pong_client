import { useSetRecoilState } from 'recoil';

import React from 'react';
import { IoIosClose } from 'react-icons/io';

import { openModalState } from 'recoils/modal';

import styles from 'styles/modals/Modal.module.scss';

type ModalTitleProps = {
  title: string;
  closeButton?: boolean;
};

export default function ModalTitle({ title, closeButton }: ModalTitleProps) {
  const setOpenModal = useSetRecoilState(openModalState);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.modalTitle}>
      <div className={styles.title}>{title}</div>
      {closeButton && (
        <IoIosClose className={styles.closeButton} onClick={handleModalClose} />
      )}
    </div>
  );
}
