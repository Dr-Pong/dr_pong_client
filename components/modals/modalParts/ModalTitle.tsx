import { useSetRecoilState } from 'recoil';
import { openModalState } from 'recoils/modal';

import { IoIosClose } from 'react-icons/io';

import styles from 'styles/modals/Modal.module.scss';

type ModalTitleProps = {
  title: string;
  closeBtn?: boolean;
};

export default function ModalTitle({ title, closeBtn }: ModalTitleProps) {
  const setOpenModal = useSetRecoilState(openModalState);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.modalTitle}>
      <div>{title}</div>
      {closeBtn && (
        <IoIosClose
          style={{ cursor: 'pointer', fontSize: '3rem' }}
          onClick={handleModalClose}
        />
      )}
    </div>
  );
}
