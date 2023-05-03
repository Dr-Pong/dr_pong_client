import useTranslation from 'next-translate/useTranslation';

import Link from 'next/link';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { UserStat } from 'types/userTypes';

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
  return (
    <div className={styles.statCard}>
      <div className={styles.container} id={styles.summary}>
        <div className={styles.box} id={styles.info}>
          <div className={styles.boxName}>{t('Summary')}</div>
          <WinRateStat winRateInfo={totalStat} />
        </div>
        <div className={styles.box} id={styles.history}>
          <Link href={`records/${userName}`}>
            <div className={styles.historyButton}>{t('History')}</div>
            <IoIosArrowForward />
          </Link>
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
