import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import Link from 'next/link';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { sideBarState } from 'recoils/sideBar';

import { ProfileStyle, StatRankResponse } from 'types/userTypes';

import useModalProvider from 'hooks/useModalProvider';
import useMyPageQuery from 'hooks/useMyPageQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import BestRecord from 'components/myPage/profile/BestRecord';
import RankTag from 'components/myPage/profile/RankTag';
import TierLp from 'components/myPage/profile/TierLp';
import WinRateStat from 'components/myPage/profile/WinRateStat';

import styles from 'styles/myPage/StatCard.module.scss';

type StatBox = {
  top: React.ReactElement;
  bottom: React.ReactElement;
};

type StatCardProps = { nickname: string; style: ProfileStyle };

export default function StatCard({ nickname, style }: StatCardProps) {
  const { statGet } = useMyPageQuery(nickname);
  const { t } = useTranslation('myPage');
  const { data, isLoading, isError } = statGet();
  const setSidebar = useSetRecoilState(sideBarState);
  const { closeModal } = useModalProvider();

  const flushOnMove = () => {
    closeModal();
    setSidebar(null);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;
  const { totalStat, seasonStat, totalRank, seasonRank } =
    data as StatRankResponse;

  const stats: StatBox[] = [
    {
      top: (
        <div className={styles.top}>
          <div className={styles.statNameRankWrap}>
            <div className={styles.statName}>{t('Rank')}</div>
            <RankTag rank={seasonRank.rank} />
          </div>
          <TierLp tier={seasonRank.tier} lp={seasonRank.bestLp} align='start' />
        </div>
      ),
      bottom: <WinRateStat winRateInfo={seasonStat} />,
    },
    {
      top: (
        <div className={styles.top}>
          <div className={styles.statName}>{t('Summary')}</div>
        </div>
      ),
      bottom: <WinRateStat winRateInfo={totalStat} />,
    },
  ];

  return (
    <div className={`${styles.statCardContainer} ${styles[style]}`}>
      <div className={styles.leftWrap}>
        {stats.map(({ top, bottom }: StatBox, i: number) => {
          return (
            <div key={i} className={styles.leftContent}>
              {top}
              {bottom}
            </div>
          );
        })}
      </div>
      <div className={styles.rightWrap}>
        <Link
          href={`/records/${nickname}`}
          className={styles.historyLink}
          onClick={flushOnMove}
        >
          <div>{t('History')}</div>
          <IoIosArrowForward />
        </Link>
        <BestRecord totalRank={totalRank} style={style} />
      </div>
    </div>
  );
}
