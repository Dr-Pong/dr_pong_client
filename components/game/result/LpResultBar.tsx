import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import styles from 'styles/game/result/LpProgressBar.module.scss';

type LpResultBarProps = {
  lpData: { lp: number; lpChange: number };
};

export default function LpResultBar({ lpData }: LpResultBarProps) {
  const { t: tGame } = useTranslation('game');
  const { lp, lpChange } = lpData;

  return (
    <div className={styles.lpResultBarContainer}>
      <div className={styles.lpResultBarTitle}>
        <div className={styles.title}>{tGame('LP')}</div>
      </div>
      <div className={styles.lpChange}>
        <div className={styles.lp}>{`${lp}`}</div>
        {lpChange === 0 || (
          <div className={styles.change}>
            {lpChange > 0 ? (
              <TiArrowSortedUp className={styles.increase} />
            ) : (
              <TiArrowSortedDown className={styles.decrease} />
            )}
            <div>{`${Math.abs(lpChange)}`}</div>
          </div>
        )}
      </div>
    </div>
  );
}
