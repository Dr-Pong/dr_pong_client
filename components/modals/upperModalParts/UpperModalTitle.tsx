import { useSetRecoilState } from 'recoil';

import { IoIosClose } from 'react-icons/io';

import { openUpperModalState } from 'recoils/modal';

import styles from 'styles/modals/Modal.module.scss';

type ModalTitleProps = {
  title: string;
  closeButton?: boolean;
};

export default function UpperModalTitle({
  title,
  closeButton,
}: ModalTitleProps) {
  const setOpenUpperModal = useSetRecoilState(openUpperModalState);
  const handleModalClose = () => {
    setOpenUpperModal(false);
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
