import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ReactElement, useState } from 'react';

import { alertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';
import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import GameLobby from 'components/game/GameLobby';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const { t } = useTranslation('game');
  const router = useRouter();
  const setAlert = useSetRecoilState(alertState);
  const { useGameInstructionModal } = useModalProvider();
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const [socket] = useGameSocket('matching');
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
      useMatchWaitingUpperModal(exitQueue.mutate, true);
      socket.once('matched', matchedListener);
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });

  const matchedListener = (data: { roomId: string }) => {
    closeUpperModal();
    router.push(`/game/${data.roomId}`);
  };

  const handleLadderClick = () => {
    enterQueue.mutate({ mode: 'classic' });
  };

  const handleNormalClick = () => {
    setNormalClicked(true);
  };

  const handleGoBackClick = () => {
    setNormalClicked(false);
  };

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
    <button
      key={'guide'}
      className={`${styles.button} ${styles.guide}`}
      onClick={useGameInstructionModal}
    >
      {t('guide')}
    </button>,
  ];

  return (
    <div className={styles.gamePageContainer}>
      {normalClicked ? (
        <GameLobby handleGoBackClick={handleGoBackClick} />
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
