import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { modalPartsState, openModalState } from 'recoils/modal';

import styles from 'styles/modals/Modal.module.scss';

export default function Modal() {
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const { head, body, tail } = useRecoilValue(modalPartsState);
  const resetModalParts = useResetRecoilState(modalPartsState);

  useEffect(() => {
    if (!openModal) resetModalParts();
  }, [openModal]);
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
          <div>{head}</div>
          {head && body && <div className={styles.blank}></div>}
          <div className={styles.modalBody}>{body}</div>
          {(head || body) && tail && <div className={styles.blank}></div>}
          <div>{tail}</div>
        </div>
      </div>,
      document.getElementById('modalRoot') as HTMLElement
    );
  }
  return null;
}
