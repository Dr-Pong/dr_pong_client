import { createPortal } from 'react-dom';

import { useEffect } from 'react';

import { useRecoilValue, useRecoilState, useResetRecoilState } from 'recoil';
import { openModalOnModalState, modalOnModalPartsState } from 'recoils/modal';

import styles from 'styles/modals/Modal.module.scss';

export default function ModalOnModal() {
  const [openModalOnModal, setOpenModalOnModal]
    = useRecoilState(openModalOnModalState);
  const { head, body, tail } = useRecoilValue(modalOnModalPartsState);
  const resetModalOnModalParts = useResetRecoilState(modalOnModalPartsState);

  useEffect(() => {
    if (!openModalOnModal) resetModalOnModalParts();
  }, [openModalOnModal]);

  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      event.preventDefault();
      if (openModalOnModal)
        setOpenModalOnModal(false);
    };
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [openModalOnModal]);

  if (openModalOnModal) {
    return createPortal(
      <div className={styles.modalBackdrop}>
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
      document.getElementById('modalOnModalStateRoot') as HTMLElement
    );
  }
  return null;
}
