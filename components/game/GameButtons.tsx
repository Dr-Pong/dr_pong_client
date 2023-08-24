import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import styles from 'styles/game/GameButtons.module.scss';

type GameButtonsProps = {
  buttons: {
    value: string;
    color: string;
    handleButtonClick: () => void;
  }[];
};

export function GameButtons({ buttons }: GameButtonsProps) {
  const { t } = useTranslation('game');

  return (
    <div className={styles.buttonList}>
      {buttons.map(({ value, color, handleButtonClick }) => {
        return (
          <button
            key={value}
            className={`${styles.button} ${styles[color]}`}
            onClick={handleButtonClick}
          >
            {t(value)}
          </button>
        );
      })}
    </div>
  );
}
