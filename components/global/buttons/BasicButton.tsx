import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { modalPartsState, openModalState } from 'recoils/modal';

import { ButtonProps } from 'types/buttonTypes';

import styles from 'styles/global/Button.module.scss';

export default function BasicButton({
  style,
  color,
  handleButtonClick,
  children,
}: ButtonProps) {
  const setOpenModal = useSetRecoilState(openModalState);
  const resetModalParts = useResetRecoilState(modalPartsState);
  const handleModalClose = () => {
    setOpenModal(false);
    resetModalParts();
  };

  return (
    <form onClick={handleButtonClick || handleModalClose}>
      <button className={`${styles[style]} ${styles[color]}`} type='button'>
        {children}
      </button>
    </form>
  );
}
