import { ButtonProps } from 'types/buttonTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

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
  const { useMatchWaitingUpperModal } = useUpperModalProvider();

  const { mutate } = mutationPost(api);

  const onSuccess = () => {
    useMatchWaitingUpperModal();
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
