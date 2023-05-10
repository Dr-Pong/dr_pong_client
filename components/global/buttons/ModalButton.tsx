import { useSetRecoilState } from 'recoil';

import { openModalState } from 'recoils/modal';

import { ButtonProps } from 'types/buttonTypes';

import styles from 'styles/global/Button.module.scss';

export default function ModalButton({
  style,
  color,
  handleButtonClick,
  children,
}: ButtonProps) {
  const setOpenModal = useSetRecoilState(openModalState);
  const handleButtonClickAndClose = (e: React.FormEvent<HTMLFormElement>) => {
    handleButtonClick?.(e);
    setOpenModal(false);
  };
  return (
    <form onClick={handleButtonClickAndClose}>
      <button
        className={`${styles.button} ${styles[style]} ${styles[color]}`}
        type='button'
      >
        {children}
      </button>
    </form>
  );
}
