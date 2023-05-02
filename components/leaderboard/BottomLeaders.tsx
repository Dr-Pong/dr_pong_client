import { Ranker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/leaderboard/BottomLeaders.module.scss';

type LeadersProps = {
  topLeaderCount: number;
  bottomLeaderCount: number;
};

export default function BottomLeaders({
  topLeaderCount,
  bottomLeaderCount,
}: LeadersProps) {
  const { mutationGet } = useCustomQuery();
  const { data, isLoading, isError } = mutationGet(
    ['bottomRank_key'],
    `/ranks/bottom?count=${bottomLeaderCount}&offset=${topLeaderCount + 1}`
  );

  const handleNicknameClick = () => {
    // 프로필 모달 띄우기
  };

  if (isLoading) return null;

  return (
    <div className={styles.bottomLeadersContainer}>
      {data.bottom.map(({ rank, nickname, lp }: Ranker, i: number) => {
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
      })}
    </div>
  );
}
