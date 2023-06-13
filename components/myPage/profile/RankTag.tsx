import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { ProfileStyle, UserRank } from 'types/userTypes';

import styles from 'styles/myPage/RankTag.module.scss';

type RankTagProps = {
  rankProps: UserRank;
  isBest: boolean;
  style: ProfileStyle;
};

export default function RankTag({ rankProps, isBest, style }: RankTagProps) {
  const { t } = useTranslation('myPage');
  const { record, rank, tier } = rankProps;

  return (
    <div
      className={`${styles.rankTagContainer} ${
        isBest ? styles.column : styles.row
      } ${styles[style]}`}
    >
      {isBest && <span className={styles.bestRecord}>{t('Best Record')}</span>}
      <span className={styles.tier}>{tier}</span>
      {tier === 'doctor' && (
        <>
          {record && <span className={styles.record}>{`${record} LP`}</span>}
          {rank && (
            <span className={styles.rank}>{`${rank}${t(
              rankSignSelector(rank)
            )}`}</span>
          )}
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
