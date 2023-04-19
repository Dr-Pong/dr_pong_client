import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from 'react-icons/io';
import { useQuery } from 'react-query';

import { UserStat } from 'types/myPageTypes';

import instance from 'utils/axios';

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
  const { t } = useTranslation(['page']);
  const fetchUserStat = async (): Promise<UserStat> => {
    const res = await instance.get(`/users/${userName}/stat`);
    return res.data;
  };
  const { data, isLoading, isError } = useQuery('userStat', fetchUserStat);
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;

  const userStat = data as UserStat;

  const totalWinRateInfo: WinRateStatProps = {
    winRate: userStat.totalStat.winRate,
    win: userStat.totalStat.win,
    ties: userStat.totalStat.ties,
    lose: userStat.totalStat.lose,
  };
  const seasonWinRateInfo: WinRateStatProps = {
    winRate: userStat.seasonStat.winRate,
    win: userStat.seasonStat.win,
    ties: userStat.seasonStat.ties,
    lose: userStat.seasonStat.lose,
  };
  const currentRankProps: RankProps = {
    record: userStat.seasonStat.currentRecord,
    rank: userStat.seasonStat.currentRank,
    isBestRecord: false,
  };
  const bestRankProps: RankProps = {
    record: userStat.seasonStat.bestRecord,
    rank: userStat.seasonStat.bestRank,
    isBestRecord: true,
  };
  // // 버튼은 나중에 공용버튼으로 바갈아버리기
  return (
    <div className={styles.statCard}>
      <div className={styles.container} id={styles.summary}>
        <div className={styles.box} id={styles.info}>
          <div className={styles.boxName}>{t('Summary')}</div>
          <WinRateStat winRateInfo={totalWinRateInfo} />
        </div>
        <div className={styles.box} id={styles.history}>
          <div className={styles.historyButton}>{t('History')}</div>
          <IoIosArrowForward />
        </div>
      </div>
      <div className={styles.container} id={styles.rank}>
        <div className={styles.box} id={styles.info}>
          <div className={styles.boxName}>{t('Rank')}</div>
          <RankTag rankProps={currentRankProps} />
          <WinRateStat winRateInfo={seasonWinRateInfo} />
        </div>
        <div className={styles.box} id={styles.bestRecord}>
          <RankTag rankProps={bestRankProps} />
        </div>
      </div>
    </div>
  );
}

// const initVal: UserStat = {
//   totalStat: {
//     winRate: 0,
//     win: 0,
//     ties: 0,
//     lose: 0,
//   },
//   seasonStat: {
//     winRate: 0,
//     win: 0,
//     ties: 0,
//     lose: 0,
//     currentRecord: 0,
//     currentRank: 0,
//     bestRecord: 0,
//     bestRank: 0,
//   },
// };