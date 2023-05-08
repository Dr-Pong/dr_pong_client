import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { UserRank } from 'types/userTypes';

import styles from 'styles/myPage/RankTag.module.scss';

export default function RankTag({
  rankProps,
  isBest,
}: {
  rankProps: UserRank;
  isBest: boolean;
}) {
  const { t } = useTranslation('myPage');
  console.log(rankProps);
  const { record, rank, tier } = rankProps;
  return (
    <div className={styles.rankTag} id={isBest ? styles.column : styles.row}>
      {isBest && <span className={styles.bestRecord}>{t('Best Record')}</span>}
      <span className={styles.tier}>{tier}</span>
      {tier === 'doctor' && (
        <>
          <span className={styles.record}>{`${record} LP`}</span>
          <span className={styles.rank}>{`${rank}${t(
            rankSignSelector(rank)
          )}`}</span>
        </>
      )}
    </div>
  );
}
const rankSignSelector = (rank: number | null): string => {
  if (rank === null) return '';
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
