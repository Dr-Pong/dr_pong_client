import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { soundEffectState } from 'recoils/sound';

import { gameResult } from 'types/gameTypes';

import useGameSocket from 'hooks/useGameSocket';
import { useSoundEffect } from 'hooks/useSoundEffect';

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
  const { effects } = useSoundEffect({});
  const isSoundEffectOn = useRecoilValue(soundEffectState);

  const touchSound = () => {
    effects.get('hit')?.(isSoundEffectOn);
  };

  useEffect(() => {
    socket.once('gameEnd', (data: gameResult) => {
      setIsEnd(true);
    });
    socket.on('barTouch', touchSound);
    socket.on('wallTouch', touchSound);
    return () => {
      socket.off('barTouch', touchSound);
      socket.off('wallTouch', touchSound);
    };
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
