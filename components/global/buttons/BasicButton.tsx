import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { modalPartsState, openModalState } from 'recoils/modal';

import styles from 'styles/global/Button.module.scss';

type CancelButtonProps = {
  style: 'basic';
  color: 'black' | 'white';
  value: string;
  handleButtonClick: React.FormEventHandler<HTMLFormElement> | null;
};

export default function BasicButton({
  style,
  color,
  value,
  handleButtonClick,
}: CancelButtonProps) {
  const setOpenModal = useSetRecoilState(openModalState);
  const resetModalParts = useResetRecoilState(modalPartsState);
  const handleModalClose = () => {
    setOpenModal(false);
    resetModalParts();
  };

  return (
    <form onClick={handleButtonClick || handleModalClose}>
      <button className={`${styles[style]} ${styles[color]}`} type='button'>
        {value}
      </button>
    </form>
  );
}
