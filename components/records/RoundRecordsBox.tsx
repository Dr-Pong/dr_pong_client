import React from 'react';
import { TiArrowSortedDown, TiArrowSortedUp } from 'react-icons/ti';

import { Round } from 'types/historyTypes';

import styles from 'styles/records/RoundRecordsBox.module.scss';

export default function RoundRecordsBox({ rounds }: { rounds: Round[] }) {
  return (
    <div className={styles.roundRecordsBoxContainer}>
      <div className={styles.timeLine}></div>
      <div className={styles.rounds}>
        {rounds.map(({ meWin, bounces }, i) => {
          return (
            <div key={i} className={styles.round}>
              {meWin ? (
                <TiArrowSortedUp className={styles.increase} />
              ) : (
                <TiArrowSortedDown className={styles.decrease} />
              )}
              <div>{bounces}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
