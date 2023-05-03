import React from 'react';

import styles from 'styles/records/MatchRecords.module.scss';
import { Round } from 'types/historyTypes';

export default function MatchRecords({ rounds }: { rounds: Round[] }) {
  return (
    <div className={styles.rounds}>
      {rounds.map((r, i) => {
        return (
          <div key={i} className={r.meWin ? styles.win : styles.lose}>
            {r.bounces}
          </div>
        );
      })}
    </div>
  );
}
