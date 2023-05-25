import { useSetRecoilState } from 'recoil';
import { openModalState } from 'recoils/modal';

import { IoIosClose } from 'react-icons/io';

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
      <div>{title}</div>
      {closeButton && (
        <IoIosClose
          className={styles.closeButton}
          onClick={handleModalClose}
        />
      )}
    </div>
  );
}
