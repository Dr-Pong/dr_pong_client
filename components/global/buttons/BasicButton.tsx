import React from 'react';

import { ButtonProps } from 'types/buttonTypes';

import styles from 'styles/global/Button.module.scss';

export default function BasicButton({
  style,
  color,
  handleButtonClick,
  children,
}: ButtonProps) {
  return (
    <form onClick={handleButtonClick}>
      <button
        className={`${styles.button} ${styles[style]} ${styles[color]}`}
        type='button'
      >
        {children}
      </button>
    </form>
  );
}
