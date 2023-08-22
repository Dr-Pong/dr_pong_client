import React from 'react';

import { TopRanker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/leaderboard/TopLeaders.module.scss';

type TopLeadersProps = {
  topLeaderCount: number;
};

export default function TopLeaders({ topLeaderCount }: TopLeadersProps) {
  const { get } = useCustomQuery();
  const { useProfileModal } = useModalProvider();
  const { data, isLoading, isError } = get(
    ['topRank_key'],
    `/ranks/top?count=${topLeaderCount}`
  );
  const leaderOrder = [
    {
      index: 1,
      style: 'second',
    },
    {
      index: 0,
      style: 'first',
    },
    {
      index: 2,
      style: 'third',
    },
  ];

  const handleProfileClick = (nickname: string): (() => void) => {
    if (!nickname) return () => null;
    return () => useProfileModal(nickname);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.topLeadersContainer}>
      {leaderOrder.map(({ index, style }) => {
        const { rank, nickname, lp, imgUrl }: TopRanker = data.top[index]
          ? data.top[index]
          : mockData[index];
        return (
          <div key={index} className={styles.leaderBox}>
            <div className={`${styles.banner} ${styles[style]}`}>
              <div className={`${styles.rank} ${styles[style]}`}>{rank}</div>
              <span className={styles.triangle}></span>
            </div>
            <div
              className={styles.leaderProfile}
              onClick={handleProfileClick(nickname)}
            >
              <img src={imgUrl} alt='profile' />
              <div className={styles.leaderNickname}>{nickname}</div>
            </div>
            <div className={styles.lp}>{nickname ? lp : ''}</div>
          </div>
        );
      })}
    </div>
  );
}

const mockData: TopRanker[] = [
  {
    rank: 1,
    nickname: '',
    lp: 0,
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/3088/3088765.png',
  },
  {
    rank: 2,
    nickname: '',
    lp: 0,
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/3088/3088765.png',
  },
  {
    rank: 3,
    nickname: '',
    lp: 0,
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/3088/3088765.png',
  },
];
