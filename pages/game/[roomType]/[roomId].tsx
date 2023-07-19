import { useRouter } from 'next/router';

import React, { ReactElement, useEffect, useState } from 'react';

import { RoomType } from 'types/gameTypes';

import PongFrame from 'components/game/PongFrame';
import PongGame from 'components/game/PongGame';
import SocketManager from 'components/global/SocketManager';
import Layout from 'components/layouts/Layout';

import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const [canvasHeight, setCanvasHeight] = useState(window.innerHeight * 0.7);
  const [canvasWidth, setCanvasWidth] = useState(
    window.innerHeight * 0.7 * 0.625
  );

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
      <PongFrame canvasWidth={canvasWidth}>
        <PongGame
          roomType={roomType as RoomType}
          roomId={roomId as string}
          canvasHeight={canvasHeight}
          canvasWidth={canvasWidth}
        />
      </PongFrame>
    </div>
  );
}

Game.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
