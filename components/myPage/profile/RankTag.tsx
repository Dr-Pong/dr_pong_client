import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { ProfileStyle } from 'types/userTypes';

import styles from 'styles/myPage/RankTag.module.scss';

type RankTagProps = {
  rank: number | null;
  style: ProfileStyle;
};

export default function RankTag({ rank, style }: RankTagProps) {
  const { t } = useTranslation('myPage');

  return rank ? (
    <div className={styles.rankTagContainer}>
      <span>Rank</span>
      <span>{`${rank}${t(rankSignSelector(rank))}`}</span>
      <span className={`${styles.triangle} ${styles[style]}`}></span>
    </div>
  ) : null;
}

export const rankSignSelector = (rank: number | null): string => {
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
