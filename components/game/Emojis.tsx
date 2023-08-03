import { useRecoilValue } from 'recoil';

import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { userState } from 'recoils/user';

import { Emoji } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';

import { throttler } from 'utils/throttler';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/game/Emojis.module.scss';

type EmojisProps = {
  setMyEmojiUrl: Dispatch<SetStateAction<string | null>>;
  setOpponentEmojiUrl: Dispatch<SetStateAction<string | null>>;
  canvasWidth: number;
};

export default function Emojis({
  setMyEmojiUrl,
  setOpponentEmojiUrl,
  canvasWidth,
}: EmojisProps) {
  const { nickname } = useRecoilValue(userState);
  const [socket] = useGameSocket('game');
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    'emoji',
    `/users/${nickname}/emojis?selected=true`
  );
  let emojiThrottleTimer: NodeJS.Timeout | null = null;

  const opponentEmojiListener = (url: string) => {
    setOpponentEmojiUrl(url);
    setTimeout(() => {
      setOpponentEmojiUrl(null);
    }, 1500);
  };

  const myEmojiListener = (url: string) => {
    setMyEmojiUrl(url);
    setTimeout(() => {
      setMyEmojiUrl(null);
    }, 1500);
  };

  useEffect(() => {
    socket.on('myEmoji', myEmojiListener);
    socket.on('opponentEmoji', opponentEmojiListener);
    return () => {
      socket.off('myEmoji', myEmojiListener);
      socket.off('opponentEmoji', opponentEmojiListener);
    };
  }, []);

  const handleEmojiClick = throttler(
    (e: React.MouseEvent<HTMLImageElement>) => {
      socket.emit('myEmoji', (e.target as HTMLImageElement).id);
    },
    1500,
    emojiThrottleTimer
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div
      className={styles.emojisContainer}
      style={{ width: `${canvasWidth}px` }}
    >
      {data.emojis.map((emoji: Emoji, i: number) =>
        emoji ? (
          <img
            key={i}
            className={styles.emoji}
            src={emoji.imgUrl}
            id={emoji.imgUrl}
            onClick={handleEmojiClick}
          />
        ) : (
          <div key={i} className={`${styles.emoji} ${styles.none}`}></div>
        )
      )}
    </div>
  );
}
