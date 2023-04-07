import React from 'react';
import { useTranslation } from 'react-i18next';

import { RankProps } from 'components/myPage/StatCard';

import styles from 'styles/myPage/RankTag.module.scss';

export default function RankTag({ rankProps }: { rankProps: RankProps }) {
  const { t } = useTranslation(['page']);
  const { record, rank, isBestRecord } = rankProps;
  const rankSignSelector = (firstDigit: string): string => {
    switch (firstDigit) {
      case '1':
        return 'st';
      case '2':
        return 'nd';
      case '3':
        return 'rd';
      default:
        return 'th';
    }
  };
  const rankSign = rankSignSelector(rank.toString().slice(-1));
  return (
    <div
      className={styles.rankTag}
      id={isBestRecord ? styles.column : styles.row}
    >
      {isBestRecord && (
        <span className={styles.bestRecord}>{t('Best Record')}</span>
      )}
      <span className={styles.record}>{`${record} LP`}</span>
      <span className={styles.rank}>{`${rank}${t(rankSign)}`}</span>
    </div>
  );
}
