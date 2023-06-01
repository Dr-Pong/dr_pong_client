import useTranslation from 'next-translate/useTranslation';

import Link from 'next/link';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import useMyPageQuery from 'hooks/useMyPageQuery';

import RankTag from 'components/myPage/profile/RankTag';
import WinRateStat from 'components/myPage/profile/WinRateStat';

import styles from 'styles/myPage/StatCard.module.scss';

type StatBox = {
  top: React.ReactElement;
  bottom: React.ReactElement;
};

export default function StatCard({ nickname }: { nickname: string }) {
  const { getStat } = useMyPageQuery(nickname);
  const { t } = useTranslation('myPage');
  const { data, isLoading, isError } = getStat();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const { totalStat, seasonStat, totalRank, seasonRank } = data;

  const stats: StatBox[] = [
    {
      top: (
        <div className={styles.top}>
          <div className={styles.statName}>{t('Summary')}</div>
        </div>
      ),
      bottom: <WinRateStat winRateInfo={totalStat} />,
    },
    {
      top: (
        <div className={styles.top}>
          <div className={styles.statName}>{t('Rank')}</div>
          <RankTag rankProps={seasonRank} isBest={false} />
        </div>
      ),
      bottom: <WinRateStat winRateInfo={seasonStat} />,
    },
  ];

  return (
    <div className={styles.statCardContainer}>
      <div className={styles.leftWrap}>
        {stats.map(({ top, bottom }: StatBox, i: number) => {
          return (
            <div key={i}>
              {top}
              {bottom}
            </div>
          );
        })}
      </div>
      <div className={styles.rightWrap}>
        <Link href={`records/${nickname}`} className={styles.historyLink}>
          <div>{t('History')}</div>
          <IoIosArrowForward />
        </Link>
        <RankTag rankProps={totalRank} isBest={true} />
      </div>
    </div>
  );
}
