import { useSetRecoilState } from 'recoil';

import React, { ReactNode } from 'react';

import { alertState } from 'recoils/alert';

import { useRouter } from 'next/router';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';
import useGameSocket from 'hooks/useGameSocket';

import BasicButton from 'components/global/buttons/BasicButton';

import { ButtonDesign } from 'types/buttonTypes';

type GameInvitationButton = {
  nickname: string;
  mode: string;
  buttonDesign: ButtonDesign;
  children: ReactNode | string;
};

export default function GameInvitationButton({
  nickname,
  mode,
  buttonDesign,
  children,
}: GameInvitationButton) {
  const { mutationPost, mutationDelete } = useCustomQuery();
  const setAlert = useSetRecoilState(alertState);
  const router = useRouter();
  const [socket] = useGameSocket('matching');
  const { closeModal } = useModalProvider();
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const gameInviteMutation = mutationPost('/invitations/games', {
    onSuccess: () => {
      closeModal();
      useMatchWaitingUpperModal(invitationCancelMutation.mutate);
      socket.once('joinGame', joinGameListener);
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });
  const invitationCancelMutation = mutationDelete('/invitations/games', {
    onSuccess: () => {
      closeModal();
      closeUpperModal();
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });

  const joinGameListener = (data: { roomId: string }) => {
    closeUpperModal();
    router.push(`/game/normal/${data.roomId}`);
  };

  const handleButtonClick = async () => {
    gameInviteMutation.mutate({ mode: mode, nickname: nickname });
  };

  return (
    <BasicButton
      style={buttonDesign.style}
      color={buttonDesign.color}
      handleButtonClick={handleButtonClick}
    >
      {children}
    </BasicButton>
  );
}
