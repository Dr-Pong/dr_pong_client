import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ReactNode, useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import { alertState } from 'recoils/alert';
import { bgmState, soundEffectState } from 'recoils/sound';

import { useBgm } from 'hooks/useBgm';
import useGameSocket from 'hooks/useGameSocket';
import { useSoundEffect } from 'hooks/useSoundEffect';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import Emojis from 'components/game/Emojis';
import MatchProfile from 'components/game/MatchProfile';
import GameResult from 'components/game/result/GameResult';

import styles from 'styles/game/Game.module.scss';

import AchievementToast from '../toasts/AchievementToast';
import TitleToast from '../toasts/TitleToast';

type PongFrameProps = {
  canvasWidth: number;
  roomId: string;
  children: ReactNode;
};

export default function PongFrame({
  canvasWidth,
  roomId,
  children,
}: PongFrameProps) {
  const { t } = useTranslation('game');
  const router = useRouter();
  const [myEmojiUrl, setMyEmojiUrl] = useState<string | null>(null);
  const [opponentEmojiUrl, setOpponentEmojiUrl] = useState<string | null>(null);
  const [isEnd, setIsEnd] = useState(false);
  const [socket] = useGameSocket('game');
  const toasts: string[] = [];
  const { bgms } = useBgm();
  const bgmOn = useRecoilValue(bgmState);
  const { effects } = useSoundEffect();
  const isSoundEffectOn = useRecoilValue(soundEffectState);
  const setAlert = useSetRecoilState(alertState);
  const { multiConnectWarningModal } = useUpperModalProvider();

  const touchSound = () => {
    effects.get('hit')?.(isSoundEffectOn);
  };

  const invalidGameIdListener = () => {
    setAlert({ type: 'warning', message: t('invalidRoom') });
    router.replace('/');
  };

  const multiConnectListener = () => {
    multiConnectWarningModal();
  };

  const achievementListener = (achievement: {
    imgUrl: string;
    name: string;
  }) => {
    toast.custom((t) => {
      toasts.push(t.id);
      return <AchievementToast achievement={achievement} />;
    });
  };

  const titleListener = (title: { title: string }) => {
    toast.custom((t) => {
      toasts.push(t.id);
      return <TitleToast title={title} />;
    });
  };

  useEffect(() => {
    socket.emit('joinGame', { roomId: roomId });
    socket.once('invalidGameId', invalidGameIdListener);
    bgms.get('game')?.(bgmOn);
    socket.once('gameEnd', () => {
      setIsEnd(true);
    });
    socket.on('multiConnect', multiConnectListener);
    socket.on('barTouch', touchSound);
    socket.on('wallTouch', touchSound);
    socket.on('achievement', achievementListener);
    socket.on('title', titleListener);
    return () => {
      bgms.get('bgm')?.(bgmOn);
      socket.off('multiConnect', multiConnectListener);
      socket.off('barTouch', touchSound);
      socket.off('wallTouch', touchSound);
      socket.off('achievement', achievementListener);
      socket.off('title', titleListener);
      toasts.forEach((toastId) => {
        toast.remove(toastId);
      });
    };
  }, []);

  if (isEnd) {
    return <GameResult />;
  }

  return (
    <div className={styles.pongFrameContainer}>
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
