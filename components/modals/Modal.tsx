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
    const handlePopstate = (event: PopStateEvent) => {
      event.preventDefault();
      if (openModal)
        setOpenModal(false);
    };
    window.addEventListener('popstate', handlePopstate);

    return () => {
      window.removeEventListener('popstate', handlePopstate);
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
          {head}
          {head && body && <div className={styles.blank}></div>}
          <div className={styles.modalBody}>{body}</div>
          {(head || body) && tail && <div className={styles.blank}></div>}
          {tail}
        </div>
      </div>,
      document.getElementById('modalRoot') as HTMLElement
    );
  }
  return null;
}
