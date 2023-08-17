import { useRecoilValue } from 'recoil';

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from 'react';

import { userState } from 'recoils/user';

import { Emoji } from 'types/userTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';

import { throttler } from 'utils/throttler';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/game/Emojis.module.scss';

export const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

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
  const [emojis, setEmojis] = useState<Emoji[]>([]);
  const { data, isLoading, isError } = get(
    'emoji',
    `/users/${nickname}/emojis?selected=true`,
    (data: { emojis: Emoji[] }) => setEmojis(data.emojis)
  );
  const emojiThrottleTimer: NodeJS.Timeout | null = null;

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

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (emojis.length === 0) return;
      const key = e.key;
      if (key === '1' || key === '2' || key === '3' || key === '4') {
        const emoji = emojis[Number(key) - 1];
        if (emoji) {
          socket.emit('myEmoji', emoji.imgUrl);
        }
      }
    },
    [emojis]
  );

  useEffect(() => {
    socket.on('myEmoji', myEmojiListener);
    socket.on('opponentEmoji', opponentEmojiListener);
    return () => {
      socket.off('myEmoji', myEmojiListener);
      socket.off('opponentEmoji', opponentEmojiListener);
    };
  }, []);

  useEffect(() => {
    if (isTouchScreen) return;
    document.addEventListener('keydown', handleKeyPress);
    return () => {
      document.removeEventListener('keydown', handleKeyPress);
    };
  }, [emojis]);

  const handleEmojiClick = (imgUrl: string) =>
    throttler(() => socket.emit('myEmoji', imgUrl), 1500, emojiThrottleTimer);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div
      className={styles.emojisContainer}
      style={{ width: `${canvasWidth}px` }}
    >
      {data.emojis.map((emoji: Emoji, i: number) =>
        emoji ? (
          <div
            key={i}
            className={styles.emojiWrap}
            onClick={handleEmojiClick(emoji.imgUrl)}
          >
            <img
              className={styles.emoji}
              src={emoji.imgUrl}
              id={emoji.imgUrl}
              alt={emoji.name}
            />
            {!isTouchScreen && (
              <div className={styles.emojiOverlay}>{i + 1}</div>
            )}
          </div>
        ) : (
          <div key={i} className={`${styles.emoji} ${styles.none}`}></div>
        )
      )}
    </div>
  );
}
