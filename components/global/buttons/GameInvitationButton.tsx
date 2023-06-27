import { ButtonProps } from 'types/buttonTypes';

import { useSetRecoilState } from 'recoil';
import { alertTypeState, openAlertState } from 'recoils/alert';

import useCustomQuery from 'hooks/useCustomQuery';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import BasicButton from 'components/global/buttons/BasicButton';

export default function GameInvitationButton({
  api,
  mode,
  button,
}: {
  api: string;
  mode: string;
  button: ButtonProps;
}) {
  const { style, color, children } = button;
  const setOpenAlert = useSetRecoilState(openAlertState);
  const setAlertType = useSetRecoilState(alertTypeState);
  const { mutationPost, mutationDelete } = useCustomQuery();
  const { closeUpperModal, useMatchWaitingUpperModal } = useUpperModalProvider();
  const gameInvitation = mutationPost(api, {
    onSuccess: () => {
      useMatchWaitingUpperModal(cancelInvitation.mutate);
    },
    onError: () => {
      setAlertType('fail');
      setOpenAlert(true);
    }
  });
  const cancelInvitation = mutationDelete('/games/invitation', {
    onSuccess: () => { closeUpperModal(); },
    onError: () => {
      setAlertType('fail');
      setOpenAlert(true);
    },
  });

  const handleButtonClick = async () => {
    gameInvitation.mutate({ mode: mode });
  };

  return (
    <>
      <BasicButton
        style={style}
        color={color}
        handleButtonClick={handleButtonClick}
      >
        {children}
      </BasicButton>
    </>
  )
}
