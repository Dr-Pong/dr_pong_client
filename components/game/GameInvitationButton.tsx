import { useSetRecoilState } from 'recoil';

import React, { ReactNode } from 'react';

import { alertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

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
  const { closeModal } = useModalProvider();
  const { closeUpperModal, useMatchWaitingUpperModal } =
    useUpperModalProvider();
  const gameInviteMutation = mutationPost('/invitations/games', {
    onSuccess: () => {
      useMatchWaitingUpperModal(invitationCancelMutation.mutate);
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
