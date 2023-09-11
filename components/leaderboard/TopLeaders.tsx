import React, { useState } from 'react';
import { MdOutlineQuestionMark } from 'react-icons/md';

import { TopRanker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/leaderboard/TopLeaders.module.scss';

type TopLeadersProps = {
  topLeaderCount: number;
};

type TopRankersResponse = {
  top: TopRanker[];
};

export default function TopLeaders({ topLeaderCount }: TopLeadersProps) {
  const { get } = useCustomQuery();
  const { useProfileModal } = useModalProvider();
  const [{ top: topRanker }, setTopRankers] = useState<TopRankersResponse>({
    top: mockRankers,
  });
  const { isLoading, isError } = get(
    ['topRank_key'],
    `/ranks/top?count=${topLeaderCount}`,
    setTopRankers
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

  return (
    <div className={styles.topLeadersContainer}>
      {leaderOrder.map(({ index, style }) => {
        const { rank, nickname, lp, imgUrl }: TopRanker =
          topRanker[index] || mockRankers[index];

        return (
          <div key={index} className={styles.leaderBox}>
            <div className={`${styles.banner} ${styles[style]}`}>
              <div className={`${styles.rank} ${styles[style]}`}>{rank}</div>
              <span className={styles.triangle}></span>
            </div>
            {isLoading || isError || lp == -1 ? (
              <DefaultProfile />
            ) : (
              <div
                className={styles.leaderProfile}
                onClick={handleProfileClick(nickname)}
              >
                <img
                  className={styles.leaderImage}
                  src={imgUrl}
                  alt='profile'
                />
                <div className={styles.leaderNickname}>{nickname}</div>
                <div className={styles.lp}>{lp}</div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const mockRankers: TopRanker[] = [
  {
    rank: 1,
    nickname: '',
    lp: -1,
    imgUrl: '',
  },
  {
    rank: 2,
    nickname: '',
    lp: -1,
    imgUrl: '',
  },
  {
    rank: 3,
    nickname: '',
    lp: -1,
    imgUrl: '',
  },
];

function DefaultProfile() {
  return (
    <div className={styles.leaderProfile}>
      <MdOutlineQuestionMark
        className={`${styles.leaderImage} ${styles.default}`}
      />
      <div className={styles.leaderNickname}>-</div>
      <div className={styles.lp}>-</div>
    </div>
  );
}
