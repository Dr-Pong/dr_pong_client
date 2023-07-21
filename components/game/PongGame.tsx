import useTranslation from 'next-translate/useTranslation';
import nipplejs from 'nipplejs';

import React, { useEffect } from 'react';
import toast from 'react-hot-toast';

import { RoomType } from 'types/gameTypes';

import useGameSocket from 'hooks/useGameSocket';

import GameCanvas from 'components/game/GameCanvas';
import Joystick from 'components/joystick/Joystick';

import styles from 'styles/game/PongGame.module.scss';

export const isTouchScreen =
  typeof window !== 'undefined' &&
  window.matchMedia('(hover: none) and (pointer: coarse)').matches;

type PongGameProps = {
  roomType: RoomType;
  roomId: string;
  canvasWidth: number;
  canvasHeight: number;
};

const PongGame = ({
  roomType,
  roomId,
  canvasWidth,
  canvasHeight,
}: PongGameProps) => {
  const { t } = useTranslation('achievement');
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
    toast(`${t(achievement.name)} ${t('achieved')}!`, {
      icon: (
        <img
          src={achievement.imgUrl}
          style={{ width: '7rem' }}
          alt={achievement.name}
        />
      ),
    });
  };

  const titleListener = (title: { title: string }) => {
    toast(
      <span>
        <h3 style={{ display: 'inline' }}>{`『${title.title}』 `}</h3>
        <span>{`${t('title achieved')}!`}</span>
      </span>
    );
  };

  useEffect(() => {
    socket.on('achievement', achievementListener);
    socket.on('title', titleListener);
    return () => {
      socket.off('achievement', achievementListener);
      socket.off('title', titleListener);
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

  return (
    <div id='pongGame' className={styles.pongGame}>
      <GameCanvas canvasHeight={canvasHeight} canvasWidth={canvasWidth} />
      {isTouchScreen && <Joystick onJoy={onJoy} offJoy={offJoy} />}
    </div>
  );
};

export default PongGame;
