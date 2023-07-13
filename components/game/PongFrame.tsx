import React, { useEffect, useState } from 'react';

import { gameResult } from 'types/gameTypes';

import useGameSocket from 'hooks/useGameSocket';

import Emojis from 'components/game/Emojis';
import MatchProfile from 'components/game/MatchProfile';
import GameResult from 'components/game/result/GameResult';

export default function PongFrame({
  canvasWidth,
  children,
}: {
  canvasWidth: number;
  children: React.ReactNode;
}) {
  const [myEmojiUrl, setMyEmojiUrl] = useState<string | null>(null);
  const [opponentEmojiUrl, setOpponentEmojiUrl] = useState<string | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [socket] = useGameSocket('game');

  useEffect(() => {
    socket.once('gameEnd', (data: gameResult) => {
      setIsEnd(true);
    });
  }, []);

  if (isEnd) {
    return <GameResult />;
  }
  return (
    <div>
      <MatchProfile
        myEmojiUrl={myEmojiUrl}
        opponentEmojiUrl={opponentEmojiUrl}
        canvasWidth={canvasWidth}
      />
      {children}
      <Emojis
        setMyEmojiUrl={setMyEmojiUrl}
        setOpponentEmojiUrl={setOpponentEmojiUrl}
        canvasWidth={canvasWidth}
      />
    </div>
  );
}
