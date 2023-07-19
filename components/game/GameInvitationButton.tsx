import { useSetRecoilState } from 'recoil';

import { IoMdAdd } from 'react-icons/io';

import { alertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import BasicButton from 'components/global/buttons/BasicButton';

type GameInvitationButton = {
  nickname: string;
  mode: string;
};
export default function GameInvitationButton({
  nickname,
  mode,
}: GameInvitationButton) {
  const { mutationPost, mutationDelete } = useCustomQuery();
  const setAlert = useSetRecoilState(alertState);
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
      style='round'
      color='pink'
      handleButtonClick={handleButtonClick}
    >
      <IoMdAdd />
    </BasicButton>
  );
}
