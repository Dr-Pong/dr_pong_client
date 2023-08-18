import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import styles from 'styles/myPage/RankTag.module.scss';

type RankTagProps = {
  rank: number | null;
};

export default function RankTag({ rank }: RankTagProps) {
  const { t } = useTranslation('myPage');

  return (
    <div className={styles.rankTagContainer}>
      {rank && (
        <span className={styles.purpleBox}>{`${rank}${t(
          rankSignSelector(rank)
        )}`}</span>
      )}
    </div>
  );
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
