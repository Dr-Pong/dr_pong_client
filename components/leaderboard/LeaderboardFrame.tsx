import styles from 'styles/leaderboard/Leaderboard.module.scss';

import BottomLeaders from 'components/leaderboard/BottomLeaders';
import TopLeaders from 'components/leaderboard/TopLeaders';

export default function LeaderboardFrame() {
  const [topLeaderCount, bottomLeaderCount] = [3, 197];

  return (
    <div className={styles.leaderboardFrame}>
      <TopLeaders topLeaderCount={topLeaderCount} />
      <BottomLeaders
        topLeaderCount={topLeaderCount}
        bottomLeaderCount={bottomLeaderCount}
      />
    </div>
  );
}
