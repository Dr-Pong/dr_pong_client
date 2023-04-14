import { useRecoilState, useRecoilValue } from 'recoil';

import React from 'react';
import { createPortal } from 'react-dom';

import { modalPartsState, openModalState } from 'recoils/modal';

import styles from 'styles/layouts/Modal.module.scss';

export default function Modal() {
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const modalParts = useRecoilValue(modalPartsState);

  const handleBackdropClick = () => {
    // 조건 추가해야함
    setOpenModal(false);
  };

  if (openModal) {
    return createPortal(
      <div className={styles.modalBackdrop} onClick={handleBackdropClick}>
        <div
          className={styles.modalContainer}
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <div>{modalParts.head}</div>
          <div>{modalParts.body}</div>
          <div>{modalParts.tail}</div>
        </div>
      </div>,
      document.getElementById('modalRoot') as HTMLElement
    );
  }
  return null;
}
