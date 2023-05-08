import useTranslation from 'next-translate/useTranslation';

import Link from 'next/link';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import useMyPageQuery from 'hooks/useMyPageQuery';

import RankTag from 'components/myPage/profile/RankTag';
import WinRateStat from 'components/myPage/profile/WinRateStat';

import styles from 'styles/myPage/StatCard.module.scss';

export default function StatCard({ nickname }: { nickname: string }) {
  const { getStat } = useMyPageQuery(nickname);
  const { t } = useTranslation('myPage');
  const { data, isLoading, isError } = getStat();
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const { totalStat, seasonStat, totalRank, seasonRank } = data;

  return (
    <div className={styles.statCard}>
      <div className={styles.container} id={styles.summary}>
        <div className={styles.box} id={styles.info}>
          <div className={styles.boxName}>{t('Summary')}</div>
          <WinRateStat winRateInfo={totalStat} />
        </div>
        <div className={styles.box} id={styles.history}>
          <Link href={`records/${nickname}`}>
            <div className={styles.historyButton}>{t('History')}</div>
            <IoIosArrowForward />
          </Link>
        </div>
      </div>
      <div className={styles.container} id={styles.rank}>
        <div className={styles.box} id={styles.info}>
          <div className={styles.boxName}>{t('Rank')}</div>
          <RankTag rankProps={seasonRank} isBest={false} />
          <WinRateStat winRateInfo={seasonStat} />
        </div>
        <div className={styles.box} id={styles.bestRecord}>
          <RankTag rankProps={totalRank} isBest={true} />
        </div>
      </div>
    </div>
  );
}
