import { useSetRecoilState } from 'recoil';

import React from 'react';

import { alertTypeState, openAlertState } from 'recoils/alert';

import { ButtonProps } from 'types/buttonTypes';

import useCustomQuery, { MutationType } from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

export type RequestProps = {
  api: string;
  method: 'post' | 'delete' | 'patch';
  options?: object;
  body?: object;
};

export default function ToastResultButton({
  request,
  button,
}: {
  request: RequestProps;
  button: ButtonProps;
}) {
  const { api, method, options, body } = request;
  const { style, color, children } = button;
  const { mutationPost, mutationPatch, mutationDelete } = useCustomQuery();
  const setOpenAlert = useSetRecoilState(openAlertState);
  const setAlertType = useSetRecoilState(alertTypeState);
  const call: { [key: string]: MutationType } = {
    post: mutationPost,
    patch: mutationPatch,
    delete: mutationDelete,
  };

  const { mutate } = call[method](api, options);

  const onSuccess = () => {
    setAlertType('success');
    setOpenAlert(true);
  };

  const onError = () => {
    setAlertType('fail');
    setOpenAlert(true);
  };

  const handleButtonClick = async () => {
    mutate(body, {
      onSuccess: onSuccess,
      onError: onError,
    });
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
