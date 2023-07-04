import { useSetRecoilState } from 'recoil';

import { alertState } from 'recoils/alert';

import { MutationButtonProps } from 'types/buttonTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

export default function MutationButton({
  style,
  color,
  children,
  mutationRequest,
  body,
  queryKeys,
  handleOnSuccess,
  handleOnError,
}: MutationButtonProps) {
  const { queryClient } = useCustomQuery();
  const setAlert = useSetRecoilState(alertState);
  const handleMutation = () => {
    mutationRequest.mutate(body, {
      onSuccess: () => {
        setAlert({ type: 'success' });
        queryKeys?.forEach((key) => queryClient.invalidateQueries(key));
        handleOnSuccess?.();
      },
      onError: () => {
        setAlert({ type: 'failure' });
        handleOnError?.();
      },
    });
  };

  return (
    <BasicButton style={style} color={color} handleButtonClick={handleMutation}>
      {children}
    </BasicButton>
  );
}
