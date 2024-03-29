import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import React from 'react';
import { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { openUpperModalState, upperModalPartsState } from 'recoils/modal';

import styles from 'styles/modals/Modal.module.scss';

export default function UpperModal() {
  const [openUpperModal, setOpenUpperModal] =
    useRecoilState(openUpperModalState);
  const { head, body, tail } = useRecoilValue(upperModalPartsState);
  const resetUpperModalParts = useResetRecoilState(upperModalPartsState);

  useEffect(() => {
    if (!openUpperModal) resetUpperModalParts();
  }, [openUpperModal]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (openUpperModal) setOpenUpperModal(false);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [openUpperModal]);

  if (openUpperModal) {
    return createPortal(
      <div className={styles.modalBackdrop}>
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
      document.getElementById('upperModalRoot') as HTMLElement
    );
  }
  return null;
}
