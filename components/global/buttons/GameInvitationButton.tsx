import { useSetRecoilState } from 'recoil';
import { matchWaitingModalState } from 'recoils/modal';

import { ButtonProps } from 'types/buttonTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

export default function GameInvitationButton({
  api,
  button,
}: {
  api: string;
  button: ButtonProps;
}) {
  const { style, color, children } = button;
  const { mutationPost } = useCustomQuery();
  const setShowWaitingModal = useSetRecoilState(matchWaitingModalState);

  const { mutate } = mutationPost(api);

  const onSuccess = () => {
    setShowWaitingModal(true);
  };

  const onError = () => {
  };

  const handleButtonClick = async () => {
    mutate(
      {},
      {
        onSuccess: onSuccess,
        onError: onError,
      });
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
