import React from 'react';

import { ButtonProps } from 'types/buttonTypes';

import styles from 'styles/global/Button.module.scss';

export default function SubmitButton({
  style,
  color,
  handleButtonClick,
  children,
}: ButtonProps) {
  const handleSubmit = () => {
    return;
  };

  return (
    <form onSubmit={handleButtonClick || handleSubmit}>
      <button
        className={`${styles.button} ${styles[style]} ${styles[color]}`}
        type='submit'
      >
        {children}
      </button>
    </form>
  );
}
