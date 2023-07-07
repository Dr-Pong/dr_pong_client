import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import { useSetRecoilState } from 'recoil';

import React, { ReactElement, useEffect, useState } from 'react';

import { alertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import GameLobby from 'components/game/GameLobby';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const { t } = useTranslation('game');
  const router = useRouter();
  const setAlert = useSetRecoilState(alertState);
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const [socket, disconnect] = useGameSocket('matching');
  const [normalClicked, setNormalClicked] = useState(false);
  const { mutationPost, mutationDelete } = useCustomQuery();
  const exitQueue = mutationDelete(`/games/queue`, {
    onSuccess: () => {
      closeUpperModal();
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });
  const enterQueue = mutationPost(`/games/queue/ladder`, {
    onSuccess: () => {
      useMatchWaitingUpperModal(exitQueue.mutate);
      socket.connect();
      socket.once('joinGame', joinGameListener);
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });

  const joinGameListener = (data: { roomId: string }) => {
    router.push(`/game/ladder/${data.roomId}`);
  }

  const handleLadderClick = () => {
    enterQueue.mutate({ mode: 'classic' });
  };

  const handleNormalClick = () => {
    setNormalClicked(true);
  };

  useEffect(() => {
    return () => {
      if (socket.connected) disconnect();
    }
  }, []);

  const buttons = [
    <button
      key={'ladder'}
      className={`${styles.button} ${styles.ladder}`}
      onClick={handleLadderClick}
    >
      {t('ladder')}
    </button>,
    <button
      key={'normal'}
      className={`${styles.button} ${styles.normal}`}
      onClick={handleNormalClick}
    >
      {t('normal')}
    </button>,
  ];

  return (
    <div className={styles.gamePageContainer}>
      {normalClicked ? (
        <GameLobby />
      ) : (
        <div className={styles.buttonList}>
          {buttons.map((button) => button)}
        </div>
      )}
    </div>
  );
}

Game.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
