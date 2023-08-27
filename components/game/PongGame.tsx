import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import useGameSocket from 'hooks/useGameSocket';

import GameCanvas from 'components/game/GameCanvas';
import AchievementToast from 'components/toasts/AchievementToast';
import TitleToast from 'components/toasts/TitleToast';

import styles from 'styles/game/PongGame.module.scss';

export const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

type Direction = 'left' | 'right';

type PongGameProps = {
  roomId: string;
  canvasWidth: number;
  canvasHeight: number;
};

const PongGame = ({ roomId, canvasWidth, canvasHeight }: PongGameProps) => {
  const [socket] = useGameSocket('game');

  let leftPressed = false;
  let rightPressed = false;
  const handleKeyPress = (e: KeyboardEvent) => {
    const key = e.key;
    if (!leftPressed && key === 'ArrowLeft') {
      leftPressed = true;
      socket.emit('keyPress', { roomId: roomId, key: 'left' });
    }
    if (!rightPressed && key === 'ArrowRight') {
      rightPressed = true;
      socket.emit('keyPress', { roomId: roomId, key: 'right' });
    }
  };

  const handleTouchStart = (direction: Direction) => () => {
    if (!leftPressed && direction === 'left') {
      leftPressed = true;
      socket.emit('keyPress', { roomId: roomId, key: 'left' });
    }
    if (!rightPressed && direction === 'right') {
      rightPressed = true;
      socket.emit('keyPress', { roomId: roomId, key: 'right' });
    }
  };

  const handleKeyRelease = (e: KeyboardEvent) => {
    const key = e.key;
    if (key === 'ArrowLeft') {
      leftPressed = false;
      socket.emit('keyRelease', { roomId: roomId, key: 'left' });
    }
    if (key === 'ArrowRight') {
      rightPressed = false;
      socket.emit('keyRelease', { roomId: roomId, key: 'right' });
    }
  };

  const handleTouchEnd = (direction: Direction) => () => {
    if (direction === 'left') {
      leftPressed = false;
      socket.emit('keyRelease', { roomId: roomId, key: 'left' });
    }
    if (direction === 'right') {
      rightPressed = false;
      socket.emit('keyRelease', { roomId: roomId, key: 'right' });
    }
  };

  useEffect(() => {
    if (!isTouchScreen) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keyup', handleKeyRelease);
    }
    return () => {
      if (!isTouchScreen) {
        document.removeEventListener('keydown', handleKeyPress);
        document.removeEventListener('keyup', handleKeyRelease);
      }
    };
  }, []);

  const achievementListener = (achievement: {
    imgUrl: string;
    name: string;
  }) => {
    toast.custom(() => <AchievementToast achievement={achievement} />);
  };

  const titleListener = (title: { title: string }) => {
    toast.custom(() => <TitleToast title={title} />);
  };

  useEffect(() => {
    socket.on('achievement', achievementListener);
    socket.on('title', titleListener);
    return () => {
      socket.off('achievement', achievementListener);
      socket.off('title', titleListener);
    };
  }, []);

  return (
    <>
      <div id='pongGame' className={styles.pongGameContainer}>
        <GameCanvas canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
      </div>
      <div
        className={styles.left}
        onTouchStart={handleTouchStart('left')}
        onTouchEnd={handleTouchEnd('left')}
      />
      <div
        className={styles.right}
        onTouchStart={handleTouchStart('right')}
        onTouchEnd={handleTouchEnd('right')}
      />
    </>
  );
};

export default PongGame;
