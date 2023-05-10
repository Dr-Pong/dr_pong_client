import { useSetRecoilState } from 'recoil';

import { openModalState } from 'recoils/modal';

import { ButtonProps } from 'types/buttonTypes';

import styles from 'styles/global/Button.module.scss';

export default function CloseModalButton({
  style,
  color,
  children,
}: ButtonProps) {
  const setOpenModal = useSetRecoilState(openModalState);
  const handleModalClose = () => {
    setOpenModal(false);
  };

  return (
    <form onClick={handleModalClose}>
      <button
        className={`${styles.button} ${styles[style]} ${styles[color]}`}
        type='button'
      >
        {children}
      </button>
    </form>
  );
}
