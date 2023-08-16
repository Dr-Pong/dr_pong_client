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

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (openModal) setOpenModal(false);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [openModal]);

  const handleBackdropClick = () => {
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
          {head && <div className={styles.modalHead}>{head}</div>}
          {body && <div className={styles.modalBody}>{body}</div>}
          {tail && <div className={styles.modalTail}>{tail}</div>}
        </div>
      </div>,
      document.getElementById('modalRoot') as HTMLElement
    );
  }
  return null;
}
