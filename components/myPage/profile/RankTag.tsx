import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { RankProps } from 'components/myPage/StatCard';

import styles from 'styles/myPage/RankTag.module.scss';

export default function RankTag({ rankProps }: { rankProps: RankProps }) {
  const { t } = useTranslation('myPage');
  const { record, rank, isBestRecord } = rankProps;
  const rankSign = rankSignSelector(rank);
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
const rankSignSelector = (rank: number): string => {
  const firstDigit = rank.toString().slice(-1);
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
