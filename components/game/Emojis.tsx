import { useRecoilValue } from 'recoil';

import React, { Dispatch, SetStateAction, useEffect } from 'react';

import { userState } from 'recoils/user';

import { Emoji } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';

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

  const emojiListener = (url: string) => {
    setOpponentEmojiUrl(url);

    setTimeout(() => {
      setOpponentEmojiUrl(null);
    }, 1500);
  };

  useEffect(() => {
    socket.on('opponentEmoji', emojiListener);
    return () => {
      socket.off('opponentEmoji', emojiListener);
    };
  }, []);

  const handleEmojiClick = (url: string) => {
    setMyEmojiUrl(url);
    socket.emit('myEmoji', url);

    setTimeout(() => {
      setMyEmojiUrl(null);
    }, 1500);
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div
      className={styles.emojisContainer}
      style={{ width: `${canvasWidth}px` }}
    >
      {data?.emojis?.map((emoji: Emoji) => (
        <img
          key={emoji?.id}
          className={styles.emoji}
          src={emoji?.imgUrl}
          onClick={() => handleEmojiClick(emoji?.imgUrl)}
        />
      ))}
    </div>
  );
}
