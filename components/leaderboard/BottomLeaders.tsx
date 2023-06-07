import { Ranker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

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

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

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
