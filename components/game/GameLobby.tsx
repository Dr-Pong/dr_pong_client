import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ChangeEvent, useState } from 'react';
import { BiUndo } from 'react-icons/bi';

import { alertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';
import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/game/GameLobby.module.scss';

export default function GameLobby({
  setNormalClicked,
}: {
  setNormalClicked: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const { t } = useTranslation('game');
  const setAlert = useSetRecoilState(alertState);
  const router = useRouter();
  const [socket] = useGameSocket('matching');
  const [gameMode, setGameMode] = useState<string>('classic');
  const { useGameInvitationModal } = useModalProvider();
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const { mutationPost, mutationDelete } = useCustomQuery();
  const exitQueue = mutationDelete(`/games/queue`, {
    onSuccess: () => {
      closeUpperModal();
      socket.once('joinGame', joinGameListener);
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });
  const enterQueue = mutationPost(`/games/queue/normal`, {
    onSuccess: () => {
      useMatchWaitingUpperModal(exitQueue.mutate);
      socket.once('joinGame', joinGameListener);
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });

  const modeList = ['classic', 'randomBounce'];

  const handleQueueClick = () => {
    enterQueue.mutate({
      mode: gameMode,
    });
  };

  const handleInviteClick = () => {
    useGameInvitationModal(gameMode);
  };

  const handleModeChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setGameMode(value);
  };

  const handleGoBackClick = () => {
    setNormalClicked(false);
  };

  const joinGameListener = (data: { roomId: string }) => {
    closeUpperModal();
    router.push(`/game/normal/${data.roomId}`);
  };

  return (
    <div className={styles.prepareRoomContainer}>
      <PageHeader title={t('prepare')} />
      <div className={styles.contents}>
        <div className={styles.modeList}>
          <div className={styles.mode}>{t('mode')}</div>
          {modeList.map((mode, i) => {
            return (
              <label key={i} className={styles.radio} htmlFor={mode}>
                <input
                  type='radio'
                  id={mode}
                  name='mode'
                  value={mode}
                  checked={gameMode === mode}
                  onChange={handleModeChange}
                />
                {t(mode)}
              </label>
            );
          })}
        </div>
        <div className={styles.buttonList}>
          <button
            className={`${styles.button} ${styles.queue}`}
            onClick={handleQueueClick}
          >
            {t('queue')}
          </button>
          <button
            className={`${styles.button} ${styles.invite}`}
            onClick={handleInviteClick}
          >
            {t('invite')}
          </button>
          <button
            key={'guide'}
            className={`${styles.button} ${styles.guide}`}
            onClick={handleGoBackClick}
          >
            {<BiUndo />}
          </button>
        </div>
      </div>
    </div>
  );
}
