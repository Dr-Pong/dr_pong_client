import { useRouter } from 'next/router';

import React, { useState, useEffect } from 'react';

import { RoomType } from 'types/gameTypes';

import SocketManager from 'components/global/SocketManager';
import MatchProfile from 'components/game/MatchProfile';
import PongGame from 'components/game/PongGame';
import Emojis from 'components/game/Emojis';


import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const [myEmojiUrl, setMyEmojiUrl] = useState<string | null>(null);
  const [opponentEmojiUrl, setOpponentEmojiUrl] = useState<string | null>(null);

  useEffect(() => {
    if (roomType !== 'ladder' && roomType !== 'normal') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
  }, []);

  return (
    <div className={styles.gamePageContainer}>
      <SocketManager namespace={'game'} />
      <MatchProfile
        myEmojiUrl={myEmojiUrl}
        opponentEmojiUrl={opponentEmojiUrl}
      />
      <PongGame
        roomType={roomType as RoomType}
        roomId={roomId as string}
      />
      <Emojis
        setMyEmojiUrl={setMyEmojiUrl}
        setOpponentEmojiUrl={setOpponentEmojiUrl}
      />
    </div>
  );
}
