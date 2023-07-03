import { useRecoilValue } from 'recoil';
import { userState } from 'recoils/user';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import useCustomQuery from 'hooks/useCustomQuery';

import styles from 'styles/game/MatchProfile.module.scss';

type MatchProfileProps = {
  myEmoji: string | null;
  opponentEmoji: string | null;
}

export default function MatchProfile({
  myEmoji,
  opponentEmoji
}: MatchProfileProps) {
  const { nickname } = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const me = get('me', `/users/${nickname}/detail`);
  const opponent = get('opponent', `/users/naeImDa/detail`);

  if (me.isLoading || opponent.isLoading) return <LoadingSpinner />;
  if (me.isError || opponent.isError) return <ErrorRefresher />;

  return (
    <div className={styles.matchProfile}>
      <div className={styles.profile}>
        {/* {opponentEmoji ?
          <img className={styles.emojiPopup} src={opponentEmoji} /> :
          <img
            className={styles.profileImg}
            src={opponent.data.image.url}
            alt={opponent.data.nickname}
          />
        } */}
        <img
          className={styles.profileImg}
          src={opponent.data.image.url}
          alt={opponent.data.nickname}
        />
        <div className={styles.profileInfo}>
          <span className={styles.nickname}>{opponent.data.nickname}</span>
          <span className={styles.level}>Level {opponent.data.level}</span>
        </div>
      </div>
      <span className={styles.vs}>vs</span>
      <div className={styles.profile}>
        {myEmoji ?
          <img className={styles.emojiPopup} src={myEmoji} /> :
          <img
            className={styles.profileImg}
            src={me.data.image.url}
            alt={nickname}
          />
        }
        <div className={styles.profileInfo}>
          <span className={styles.nickname}>{nickname}</span>
          <span className={styles.level}>Level {me.data.level}</span>
        </div>
      </div>
    </div>
  );
}
