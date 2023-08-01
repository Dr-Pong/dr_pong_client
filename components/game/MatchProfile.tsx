import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { userState } from 'recoils/user';

import { UserDetail } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';

import instance from 'utils/axios';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/game/MatchProfile.module.scss';

type MatchProfileProps = {
  myEmojiUrl: string | null;
  opponentEmojiUrl: string | null;
  canvasWidth: number;
};

export default function MatchProfile({
  myEmojiUrl,
  opponentEmojiUrl,
  canvasWidth,
}: MatchProfileProps) {
  const { nickname } = useRecoilValue(userState);
  const [socket] = useGameSocket('game');
  const { get } = useCustomQuery();
  const me = get('me', `/users/${nickname}/detail`);
  const [opponent, setOpponent] = useState<UserDetail | null>(null);

  const matchInfo = async (data: { nickname: string }) => {
    try {
      setOpponent((await instance.get(`/users/${data.nickname}/detail`)).data);
    } catch (e) {
      return <ErrorRefresher />;
    }
  };

  useEffect(() => {
    socket.once('matchInfo', matchInfo);
  }, []);

  if (me.isLoading) return <LoadingSpinner />;
  if (me.isError) return <ErrorRefresher />;

  return (
    <div
      className={styles.matchProfileContainer}
      style={{ width: `${canvasWidth}px` }}
    >
      <div className={styles.profile}>
        {opponentEmojiUrl ? (
          <img className={styles.emojiPopup} src={opponentEmojiUrl} />
        ) : (
          <img
            className={styles.profileImg}
            src={opponent?.image?.url}
            alt={opponent?.nickname}
          />
        )}
        <div className={styles.profileInfo}>
          <span>{opponent?.nickname}</span>
          <span>{opponent?.title?.title}</span>
        </div>
      </div>
      <span className={styles.vs}>vs</span>
      <div className={`${styles.profile} ${styles.reverse}`}>
        {myEmojiUrl ? (
          <img
            className={`${styles.profileImg} ${styles.popup}`}
            src={myEmojiUrl}
          />
        ) : (
          <img
            className={styles.profileImg}
            src={me.data.image.url}
            alt={nickname}
          />
        )}
        <div className={`${styles.profileInfo} ${styles.reverse}`}>
          <span>{nickname}</span>
          <span>{me.data.title?.title}</span>
        </div>
      </div>
    </div>
  );
}
