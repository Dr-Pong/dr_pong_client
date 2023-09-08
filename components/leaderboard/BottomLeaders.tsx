import React from 'react';

import { Ranker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/leaderboard/BottomLeaders.module.scss';

type LeadersProps = {
  topLeaderCount: number;
  bottomLeaderCount: number;
};

export default function BottomLeaders({
  topLeaderCount,
  bottomLeaderCount,
}: LeadersProps) {
  const { get } = useCustomQuery();
  const { useProfileModal } = useModalProvider();
  const { data, isLoading, isError } = get(
    ['bottomRank_key'],
    `/ranks/bottom?count=${bottomLeaderCount}&offset=${topLeaderCount + 1}`
  );

  const handleNicknameClick = (e: React.MouseEvent<HTMLElement>) => {
    const nickname = (e.target as HTMLElement).innerHTML;
    useProfileModal(nickname);
  };

  return (
    <div className={styles.bottomLeadersContainer}>
      {!data || isLoading || isError ? (
        <></>
      ) : (
        data.bottom.map(({ rank, nickname, lp }: Ranker, i: number) => {
          return (
            <div key={i} className={styles.leaderBox}>
              <span className={styles.leaderRank}>{rank}</span>
              <span
                className={styles.leaderNickname}
                onClick={handleNicknameClick}
              >
                {nickname}
              </span>
              <span className={styles.leaderLp}>{lp}</span>
            </div>
          );
        })
      )}
    </div>
  );
}
