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
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.7);
  const [canvasWidth, setCanvasWidth] = useState(window.innerHeight * 0.7 * 0.625);

  const handleResize = () => {
    setCanvasHeight(window.innerHeight * 0.7);
    setCanvasWidth(window.innerHeight * 0.7 * 0.625);
  };

  useEffect(() => {
    if (roomType !== 'ladder' && roomType !== 'normal') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className={styles.gamePageContainer}>
      <SocketManager namespace={'game'} />
      <MatchProfile
        myEmojiUrl={myEmojiUrl}
        opponentEmojiUrl={opponentEmojiUrl}
        canvasWidth={canvasWidth}
      />
      <PongGame
        roomType={roomType as RoomType}
        roomId={roomId as string}
        canvasHeight={canvasHeight}
        canvasWidth={canvasWidth}
      />
      <Emojis
        setMyEmojiUrl={setMyEmojiUrl}
        setOpponentEmojiUrl={setOpponentEmojiUrl}
        canvasWidth={canvasWidth}
      />
    </div>
  );
}
