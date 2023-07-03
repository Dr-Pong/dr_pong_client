import { useEffect, Dispatch, SetStateAction } from 'react';

import { useRecoilValue } from 'recoil';
import { userState } from 'recoils/user';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import useCustomQuery from 'hooks/useCustomQuery';

import { Emoji } from 'types/userTypes';

import styles from 'styles/game/Emojis.module.scss';

type EmojisProps = {
  setMyEmojiUrl: Dispatch<SetStateAction<string | null>>;
  setOpponentEmojiUrl: Dispatch<SetStateAction<string | null>>;
};

export default function Emojis({
  setMyEmojiUrl,
  setOpponentEmojiUrl
}: EmojisProps) {
  const { nickname } = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } =
    get('', `/users/${nickname}/emojis?selected=true`);

  if (isLoading) return <LoadingSpinner />
  if (isError) return <ErrorRefresher />

  // useEffect(() => {
  //   const handler = (emojiUrl: string) => {
  //     setOpponentEmojiUrl(emojiUrl);

  //     setTimeout(() => {
  //       setOpponentEmojiUrl(null);
  //     }, 1500);
  //   }
  //   socket.on('', handler);
  //   return (() => {
  //     socket.off('', handler);
  //   })
  // }, []);

  const handleEmojiClick = (emojiUrl: string) => {
    setMyEmojiUrl(emojiUrl);
    // socket.emit(emojiUrl);

    setTimeout(() => {
      setMyEmojiUrl(null);
    }, 1500);
  };

  return (
    <div className={styles.emojisContainer}>
      {data?.emojis.map((emoji: Emoji) => (
        <img
          key={emoji.id}
          className={styles.emoji}
          src={emoji.imgUrl}
          onClick={() => handleEmojiClick(emoji.imgUrl)}
        />
      ))}
    </div>
  );
};
