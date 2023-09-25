import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ReactElement, useState } from 'react';
import { BsQuestionSquare } from 'react-icons/bs';

import { alertState } from 'recoils/alert';
import { soundEffectState } from 'recoils/sound';

import useCustomQuery from 'hooks/useCustomQuery';
import useGameSocket from 'hooks/useGameSocket';
import useModalProvider from 'hooks/useModalProvider';
import { useSoundEffect } from 'hooks/useSoundEffect';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import { GameButtons } from 'components/game/GameButtons';
import GameLobby from 'components/game/GameLobby';
import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/game/Game.module.scss';

export default function Game() {
  const { t } = useTranslation('game');
  const router = useRouter();
  const setAlert = useSetRecoilState(alertState);
  const { useGameGuideModal } = useModalProvider();
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const { effects } = useSoundEffect();
  const isSoundEffectOn = useRecoilValue(soundEffectState);
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
    onError: (error: AxiosError<Error>) => {
      setAlert({
        type: 'failure',
        message: t(`${error.response?.data.message}`),
      });
    },
  } as object);

  const matchedListener = (data: { roomId: string }) => {
    closeUpperModal();
    effects.get('game_start')?.(isSoundEffectOn);
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
    { value: 'ladder', color: 'pink', handleButtonClick: handleLadderClick },
    { value: 'normal', color: 'purple', handleButtonClick: handleNormalClick },
  ];

  const headerButtons = [
    {
      value: <BsQuestionSquare />,
      handleButtonClick: useGameGuideModal,
    },
  ];

  return (
    <div className={styles.gamePageContainer}>
      <PageHeader title={t('prepare')} buttons={headerButtons} />
      {normalClicked ? (
        <GameLobby handleGoBackClick={handleGoBackClick} />
      ) : (
        <GameButtons buttons={buttons} />
      )}
    </div>
  );
}

Game.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
