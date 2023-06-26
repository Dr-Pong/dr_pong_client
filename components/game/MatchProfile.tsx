import { useRecoilValue } from 'recoil';
import { userState } from 'recoils/user';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/game/MatchProfile.module.scss';

export default function MatchProfile() {
  const { nickname } = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const me = get('me', `/users/${nickname}/detail`);
  const opponent = get('opponent', `/users/naeImDa/detail`);

  if (me.isLoading || opponent.isLoading) return <LoadingSpinner />;
  if (me.isError || opponent.isError) return <ErrorRefresher />;

  return (
    <div className={styles.matchProfile}>
      <div className={styles.profile}>
        <img className={styles.profilePicture} src={opponent.data.image.url} alt="상대 프로필 사진" />
        <div className={styles.profileInfo}>
          <span className={styles.nickname}>{opponent.data.nickname}</span>
          <span className={styles.level}>Level {opponent.data.level}</span>
        </div>
      </div>
      <span className={styles.vs}>vs</span>
      <div className={styles.profile}>
        <img className={styles.profilePicture} src={me.data.image.url} alt="내 프로필 사진" />
        <div className={styles.profileInfo}>
          <span className={styles.nickname}>{nickname}</span>
          <span className={styles.level}>Level {me.data.level}</span>
        </div>
      </div>
    </div>
  );
}
