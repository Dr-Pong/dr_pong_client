import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import React, { ReactElement, useState } from 'react';

import { alertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import GameLobby from 'components/game/GameLobby';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const { t } = useTranslation('game');
  const setAlert = useSetRecoilState(alertState);
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
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
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });

  const handleLadderClick = () => {
    enterQueue.mutate({ mode: 'classic' });
  };

  const handleNormalClick = () => {
    setNormalClicked(true);
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
