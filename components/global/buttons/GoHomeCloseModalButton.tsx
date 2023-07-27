import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React from 'react';

import { openModalState } from 'recoils/modal';

import { ButtonProps } from 'types/buttonTypes';

import styles from 'styles/global/Button.module.scss';

export default function GoHomeCloseModalButton({
  style,
  color,
  children,
}: ButtonProps) {
  const setOpenModal = useSetRecoilState(openModalState);
  const router = useRouter();
  const handleModalClose = () => {
    setOpenModal(false);
    router.push('/');
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
