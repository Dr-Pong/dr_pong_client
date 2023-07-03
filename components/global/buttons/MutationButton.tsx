import { toast } from 'react-hot-toast';

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
  const handleMutation = () => {
    mutationRequest.mutate(body, {
      onSuccess: () => {
        toast.success('success');
        queryKeys?.forEach((key) => queryClient.invalidateQueries(key));
        handleOnSuccess?.();
      },
      onError: () => {
        toast.error('error');
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
