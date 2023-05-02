import { TopRanker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/leaderboard/TopLeaders.module.scss';

type TopLeadersProps = {
  topLeaderCount: number;
};

export default function TopLeaders({ topLeaderCount }: TopLeadersProps) {
  const { mutationGet } = useCustomQuery();
  const { data, isLoading, isError } = mutationGet(
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

  if (isLoading) return null;

  return (
    <div className={styles.topLeadersContainer}>
      {leaderOrder.map(({ index, style }) => {
        const { rank, nickname, lp, imgUrl }: TopRanker = data.top[index];
        return (
          <div className={styles.leaderBox}>
            <div className={styles.leaderRank}>
              <div className={`${styles[style]}`}>{rank}</div>
            </div>
            <div className={styles.leaderProfile}>
              <img src={imgUrl} alt='profile' />
              <div>{nickname}</div>
              <div>{lp}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
