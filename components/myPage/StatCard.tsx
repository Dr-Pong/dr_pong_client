import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosArrowForward } from 'react-icons/io';

import RankTag from 'components/myPage/RankTag';
import WinRateStat from 'components/myPage/WinRateStat';

import styles from 'styles/myPage/StatCard.module.scss';

export interface WinRateStatProps {
  winRate: number;
  wins: number;
  ties: number;
  losses: number;
}

export interface RankProps {
  record: number;
  rank: number;
  isBestRecord?: boolean;
}

export default function StatCard() {
  const { t } = useTranslation(['page']);
  const totalWinRateInfo: WinRateStatProps = {
    winRate: 50,
    wins: 10,
    ties: 5,
    losses: 10,
  }; // 나중에 서버에서 받아오는 정보로 바꿔야함
  const seasonWinRateInfo: WinRateStatProps = {
    winRate: 50,
    wins: 10,
    ties: 5,
    losses: 10,
  };
  const currentRankProps: RankProps = {
    record: 3400,
    rank: 128,
    isBestRecord: false,
  };
  const bestRankProps: RankProps = {
    record: 5000,
    rank: 1,
    isBestRecord: true,
  };
  // 버튼은 나중에 공용버튼으로 바갈아버리기
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
