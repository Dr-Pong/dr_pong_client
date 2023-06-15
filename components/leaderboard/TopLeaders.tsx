import { TopRanker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

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

  const handleNicknameClick = (e: React.MouseEvent<HTMLElement>) => {
    const nickname = (e.target as HTMLElement).innerHTML;
    if (nickname)
      useProfileModal(nickname);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.topLeadersContainer}>
      {leaderOrder.map(({ index, style }) => {
        const { rank, nickname, lp, imgUrl }: TopRanker =
          data.top[index] ? data.top[index] : mockData[index];
        return (
          <div className={styles.leaderBox}>
            <div className={styles.leaderRank}>
              <div className={`${styles[style]}`}>{rank}</div>
            </div>
            <div className={styles.leaderProfile}>
              <img src={imgUrl} alt='profile' />
              <div
                className={styles.leaderNickname}
                onClick={handleNicknameClick}
              >
                {nickname}
              </div>
              <div>{nickname ? lp : ''}</div>
            </div>
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
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/3088/3088765.png'
  },
  {
    rank: 2,
    nickname: '',
    lp: 0,
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/3088/3088765.png'
  },
  {
    rank: 3,
    nickname: '',
    lp: 0,
    imgUrl: 'https://cdn-icons-png.flaticon.com/512/3088/3088765.png'
  },
];
