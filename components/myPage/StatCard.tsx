import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { UserStat } from 'types/myPageTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import RankTag from 'components/myPage/RankTag';
import WinRateStat from 'components/myPage/WinRateStat';

import styles from 'styles/myPage/StatCard.module.scss';

export interface WinRateStatProps {
  winRate: number;
  win: number;
  ties: number;
  lose: number;
}
export interface RankProps {
  record: number;
  rank: number;
  isBestRecord?: boolean;
}
export default function StatCard({ userName }: { userName: string }) {
  const { getStat } = useMyPageQuery(userName);
  const { t } = useTranslation('myPage');
  const { data, isLoading, isError } = getStat();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const { totalStat, seasonStat, bestStat } = data as UserStat;
  const currentRank = {
    isBestRecord: false,
    rank: seasonStat.rank,
    record: seasonStat.record,
  };
  const bestRank = { isBestRecord: true, ...bestStat };
  // // 버튼은 나중에 공용버튼으로 바갈아버리기
  return (
    <div className={styles.statCard}>
      <div className={styles.container} id={styles.summary}>
        <div className={styles.box} id={styles.info}>
          <div className={styles.boxName}>{t('Summary')}</div>
          <WinRateStat winRateInfo={totalStat} />
        </div>
        <div className={styles.box} id={styles.history}>
          <div className={styles.historyButton}>{t('History')}</div>
          <IoIosArrowForward />
        </div>
      </div>
      <div className={styles.container} id={styles.rank}>
        <div className={styles.box} id={styles.info}>
          <div className={styles.boxName}>{t('Rank')}</div>
          <RankTag rankProps={currentRank} />
          <WinRateStat winRateInfo={seasonStat} />
        </div>
        <div className={styles.box} id={styles.bestRecord}>
          <RankTag rankProps={bestRank} />
        </div>
      </div>
    </div>
  );
}
