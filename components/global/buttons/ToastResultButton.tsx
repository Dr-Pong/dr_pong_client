import React from 'react';

import { ButtonProps } from 'types/buttonTypes';

import useCustomQuery, { MutationType } from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

export type RequestProp = {
  api: string;
  method: 'post' | 'delete' | 'patch';
  options?: object;
  body?: object;
};

export default function ToastResultButton({
  request,
  buttonProps,
}: {
  request: RequestProp;
  buttonProps: ButtonProps;
}) {
  const { api, method, options, body } = request;
  const { style, color, children } = buttonProps;
  const { mutationPost, mutationPatch, mutationDelete } = useCustomQuery();

  const call: { [key: string]: MutationType } = {
    post: mutationPost,
    patch: mutationPatch,
    delete: mutationDelete,
  };

  const { mutate, isLoading, isError } = call[method](api, options);

  const handleButtonClick = () => {
    mutate(body);
    //useToast with isLoading and isError
  };

  return (
    <BasicButton
      style={style}
      color={color}
      handleButtonClick={handleButtonClick}
    >
      {children}
    </BasicButton>
  );
}
