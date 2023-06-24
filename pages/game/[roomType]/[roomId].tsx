import { useRouter } from 'next/router';

import React, { useEffect } from 'react';

import { RoomType } from 'types/gameTypes';

import MatchProfile from 'components/game/MatchProfile';
import PongGame from 'components/game/PongGame';
import Emojis from 'components/game/Emojis';

import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const router = useRouter();
  const { roomType, roomId } = router.query;

  useEffect(() => {
    if (roomType !== 'ladder' && roomType !== 'normal') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
  }, []);

  return (
    <div className={styles.gamePageContainer}>
      <MatchProfile />
      <PongGame
        roomType={roomType as RoomType}
        roomId={roomId as string}
      />
      <Emojis />
    </div>
  );
}
