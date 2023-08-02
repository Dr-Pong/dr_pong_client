import React, { useEffect, useState } from 'react';

import useGameSocket from 'hooks/useGameSocket';

import styles from 'styles/game/MatchProfile.module.scss';

type User = {
  nickname: string;
  title: string;
  imgUrl: string;
}

type GameUsers = {
  me: User;
  opponent: User;
};

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
  const [socket] = useGameSocket('game');
  const [me, setMe] = useState<User | null>(null);
  const [opponent, setOpponent] = useState<User | null>(null);

  const userInitListener = async (data: GameUsers) => {
    setMe(data.me);
    setOpponent(data.opponent);
  };

  useEffect(() => {
    socket.once('userInit', userInitListener);
  }, []);

  return (
    <div
      className={styles.matchProfileContainer}
      style={{ width: `${canvasWidth}px` }}
    >
      <div className={styles.profile}>
        {opponentEmojiUrl ? (
          <img
            className={`${styles.profileImg} ${styles.popup}`}
            src={opponentEmojiUrl}
          />
        ) : (
          <img
            className={styles.profileImg}
            src={opponent?.imgUrl}
            alt={opponent?.nickname}
          />
        )}
        <div className={styles.profileInfo}>
          <span>{opponent?.nickname}</span>
          <span>{opponent?.title}</span>
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
            src={me?.imgUrl}
            alt={me?.nickname}
          />
        )}
        <div className={`${styles.profileInfo} ${styles.reverse}`}>
          <span>{me?.nickname}</span>
          <span>{me?.title}</span>
        </div>
      </div>
    </div>
  );
}
