import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ChangeEvent, useCallback, useState } from 'react';
import { IoMdArrowRoundBack } from 'react-icons/io';

import { alertState } from 'recoils/alert';
import { soundEffectState } from 'recoils/sound';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';
import useModalProvider from 'hooks/useModalProvider';
import { useSoundEffect } from 'hooks/useSoundEffect';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import { GameButtons } from 'components/game/GameButtons';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/game/Game.module.scss';

type GameLobbyProps = {
  handleGoBackClick: () => void;
};

export default function GameLobby({ handleGoBackClick }: GameLobbyProps) {
  const { t } = useTranslation('game');
  const setAlert = useSetRecoilState(alertState);
  const router = useRouter();
  const [socket] = useGameSocket('matching');
  const [gameMode, setGameMode] = useState<string>('classic');
  const { useGameInvitationModal } = useModalProvider();
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const { effects } = useSoundEffect();
  const isSoundEffectOn = useRecoilValue(soundEffectState);
  const { mutationPost, mutationDelete } = useCustomQuery();
  const exitQueue = mutationDelete(`/games/queue`, {
    onSuccess: () => {
      closeUpperModal();
      socket.once('matched', matchedListener);
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });
  const enterQueue = mutationPost(`/games/queue/normal`, {
    onSuccess: () => {
      useMatchWaitingUpperModal(exitQueue.mutate, true);
      socket.once('matched', matchedListener);
    },
    onError: (error: AxiosError<Error>) => {
      setAlert({
        type: 'failure',
        message: t(`${error.response?.data.message}`),
      });
    },
  } as object);

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

  const matchedListener = useCallback(
    (data: { roomId: string }) => {
      closeUpperModal();
      effects.get('game_start')?.(isSoundEffectOn);
      router.push(`/game/${data.roomId}`);
    },
    [isSoundEffectOn]
  );

  const buttons = [
    { value: 'queue', color: 'pink', handleButtonClick: handleQueueClick },
    { value: 'invite', color: 'purple', handleButtonClick: handleInviteClick },
  ];

  return (
    <div className={styles.gameLobbyContainer}>
      <div className={styles.gameTypeBackButtonWrap}>
        <BasicButton
          style='cookie'
          color='white'
          handleButtonClick={handleGoBackClick}
        >
          <IoMdArrowRoundBack />
        </BasicButton>
        <span className={styles.gameType}>{t('normal')}</span>
      </div>
      <ul className={styles.modeList}>
        {modeList.map((mode, i) => {
          return (
            <li key={'li' + i}>
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
            </li>
          );
        })}
      </ul>
      <GameButtons buttons={buttons} />
    </div>
  );
}
