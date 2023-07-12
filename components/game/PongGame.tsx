import nipplejs from 'nipplejs';

import React, { useEffect, useState } from 'react';

import { RoomType, gameResult } from 'types/gameTypes';

import useGameSocket from 'hooks/useGameSocket';

import GameCanvas from 'components/game/GameCanvas';
import GameResult from 'components/game/result/GameResult';
import Joystick from 'components/joystick/Joystick';

import styles from 'styles/game/PongGame.module.scss';

export const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

type PongGameProps = {
  roomType: RoomType;
  roomId: string;
};

const PongGame = ({ roomType, roomId }: PongGameProps) => {
  const [socket] = useGameSocket('game');
  const [isEnd, setIsEnd] = useState(false);

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

  const gameResultPopper = (data: gameResult) => {};

  useEffect(() => {
    if (!isTouchScreen) {
      document.addEventListener('keydown', handleKeyPress);
      document.addEventListener('keyup', handleKeyRelease);
    }
    socket.once('gameEnd', gameResultPopper);
    return () => {
      if (!isTouchScreen) {
        document.removeEventListener('keydown', handleKeyPress);
        document.removeEventListener('keyup', handleKeyRelease);
      }
    };
  }, []);

  const achievementListener = () => {
    setIsEnd(true);
  };

  useEffect(() => {
    socket.on('achievement', achievementListener);

    return () => {
      socket.off('achievement', achievementListener);
    };
  }, []);

  const onJoy = (data: nipplejs.JoystickOutputData) => {
    const x = data?.direction?.x;
    if (x === 'left') {
      socket.emit('keyPress', { roomId: roomId, key: 'left' });
    }
    if (x === 'right') {
      socket.emit('keyPress', { roomId: roomId, key: 'right' });
    }
  };

  const offJoy = () => {
    socket.emit('keyRelease', { roomId: roomId, key: 'left' });
    socket.emit('keyRelease', { roomId: roomId, key: 'right' });
  };

  if (isEnd) {
    return <GameResult />;
  }
  return (
    <div id='pongGame' className={styles.pongGame}>
      <GameCanvas />
      {isTouchScreen && <Joystick onJoy={onJoy} offJoy={offJoy} />}
    </div>
  );
};

export default PongGame;
