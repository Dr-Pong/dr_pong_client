import { useSetRecoilState } from 'recoil';

import { modalPartsState, openModalState } from 'recoils/modal';

import { TopRanker } from 'types/rankTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import ProfileButtons from 'components/global/buttons/buttonContainers/ProfileButtons';
import Profile from 'components/myPage/Profile';

import styles from 'styles/leaderboard/TopLeaders.module.scss';

type TopLeadersProps = {
  topLeaderCount: number;
};

export default function TopLeaders({ topLeaderCount }: TopLeadersProps) {
  const setModalParts = useSetRecoilState(modalPartsState);
  const setOpenModal = useSetRecoilState(openModalState);
  const { get } = useCustomQuery();
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
    setModalParts({
      head: null,
      body: <Profile userName={nickname} />,
      tail: <ProfileButtons target={nickname} />,
    });
    setOpenModal(true);
  };

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
              <div onClick={handleNicknameClick}>{nickname}</div>
              <div>{lp}</div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
