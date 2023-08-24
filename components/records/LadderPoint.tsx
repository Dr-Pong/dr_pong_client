import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import styles from 'styles/records/MatchDetail.module.scss';

type LadderPointProps = {
  lp: number;
  lpChange: number;
};

export default function LadderPoint({ lp, lpChange }: LadderPointProps) {
  return (
    <div className={styles.ladderPointContainer}>
      <span className={styles.lp}>{`${lp}`}</span>
      {lpChange === 0 || (
        <span className={styles.lpChange}>
          {lpChange > 0 ? (
            <TiArrowSortedUp className={styles.increase} />
          ) : (
            <TiArrowSortedDown className={styles.decrease} />
          )}
          <span>{`${Math.abs(lpChange)}`}</span>
        </span>
      )}
    </div>
  );
}
