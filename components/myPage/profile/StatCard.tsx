import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import Link from 'next/link';

import React from 'react';
import { IoIosArrowForward } from 'react-icons/io';

import { sideBarState } from 'recoils/sideBar';

import { ProfileStyle } from 'types/userTypes';

import useModalProvider from 'hooks/useModalProvider';
import useMyPageQuery from 'hooks/useMyPageQuery';

import LoadingSpinner from 'components/global/LoadingSpinner';
import RankTag from 'components/myPage/profile/RankTag';
import WinRateStat from 'components/myPage/profile/WinRateStat';

import styles from 'styles/myPage/StatCard.module.scss';

type StatCardProps = { nickname: string; style: ProfileStyle };

export default function StatCard({ nickname, style }: StatCardProps) {
  const { statGet } = useMyPageQuery(nickname);
  const { t } = useTranslation('myPage');
  const { data, isLoading } = statGet();
  const setSidebar = useSetRecoilState(sideBarState);
  const { closeModal } = useModalProvider();

  const flushOnMove = () => {
    closeModal();
    setSidebar(null);
  };

  const statTypes = [
    {
      type: 'season',
      rank: data.seasonRank,
      stat: data.seasonStat,
      lpTag: 'ladderTag',
    },
    {
      type: 'total',
      rank: data.totalRank,
      stat: data.totalStat,
      lpTag: 'best',
    },
  ];

  return (
    <div className={`${styles.statCardContainer} ${styles[style]}`}>
      <Link
        href={`/records/${nickname}`}
        className={styles.historyLink}
        onClick={flushOnMove}
      >
        <div>{t('History')}</div>
        <IoIosArrowForward />
      </Link>
      {isLoading || !data ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.statsWrap}>
          {statTypes.map(({ type, rank, stat, lpTag }) => {
            return (
              <div className={styles.statBox} key={type}>
                <div className={styles.statNameRankWrap}>
                  <div className={styles.statName}>{t(type)}</div>
                  {type === 'season' && <RankTag rank={data.seasonRank.rank} />}
                </div>
                <div className={styles.lpRankWrap}>
                  <div className={styles.lpWrap}>
                    <span className={styles.lpTag}>{t(lpTag)}</span>
                    <span className={styles.lp}>
                      <span className={styles.number}>{rank.bestLp}</span>
                      <span className={styles.unit}>LP</span>
                    </span>
                  </div>
                </div>
                <WinRateStat winRateInfo={stat} />
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
