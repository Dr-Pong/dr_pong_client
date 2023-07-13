import { useEffect, useState } from 'react';

import { useRecoilValue } from 'recoil';
import { userState } from 'recoils/user';

import { UserDetail } from 'types/userTypes';

import instance from 'utils/axios';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/game/MatchProfile.module.scss';

type MatchProfileProps = {
  myEmojiUrl: string | null;
  opponentEmojiUrl: string | null;
  canvasWidth: number;
}

export default function MatchProfile({
  myEmojiUrl,
  opponentEmojiUrl,
  canvasWidth
}: MatchProfileProps) {
  const { nickname } = useRecoilValue(userState);
  const [socket] = useGameSocket('game');
  const { get } = useCustomQuery();
  const me = get('me', `/users/${nickname}/detail`);
  const [opponent, setOpponent] = useState<UserDetail | null>(null);

  const matchInfo = async (data: { nickname: string }) => {
    try {
      setOpponent((await instance.get(
        `/users/${data.nickname}/detail`
      )).data);
    } catch (e) {
      return <ErrorRefresher />;
    }
  }

  useEffect(() => {
    socket.once('matchInfo', matchInfo);
  }, []);

  if (me.isLoading) return <LoadingSpinner />;
  if (me.isError) return <ErrorRefresher />;

  return (
    <div className={styles.matchProfile} style={{ width: `${canvasWidth}px` }}>
      <div className={styles.profile}>
        {opponentEmojiUrl ?
          <img className={styles.emojiPopup} src={opponentEmojiUrl} /> :
          <img
            className={styles.profileImg}
            src={opponent?.image?.url}
            alt={opponent?.nickname}
          />
        }
        <div className={styles.profileInfo}>
          <span className={styles.nickname}>{opponent?.nickname}</span>
          <span className={styles.title}>{opponent?.title?.title}</span>
        </div>
      </div>
      <span className={styles.vs}>vs</span>
      <div className={styles.profile}>
        {myEmojiUrl ?
          <img className={styles.emojiPopup} src={myEmojiUrl} /> :
          <img
            className={styles.profileImg}
            src={me.data.image.url}
            alt={nickname}
          />
        }
        <div className={styles.profileInfo}>
          <span className={styles.nickname}>{nickname}</span>
          <span className={styles.title}>{me.data.title?.title}</span>
        </div>
      </div>
    </div>
  );
}
