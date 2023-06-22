import { useRecoilState, useSetRecoilState } from 'recoil';

import React from 'react';
import { QueryKey } from 'react-query';

import { alertTypeState, openAlertState } from 'recoils/alert';
import { dropdownUserState } from 'recoils/friends';

import { ButtonProps } from 'types/buttonTypes';

import useCustomQuery, { MutationType } from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

export type RequestProps = {
  api: string;
  method: 'post' | 'delete' | 'patch';
  options?: object;
  body?: object;
  keys?: QueryKey[];
};

export default function ToastResultButton({
  request,
  button,
}: {
  request: RequestProps;
  button: ButtonProps;
}) {
  const { api, method, options, body, keys } = request;
  const { style, color, children } = button;
  const { mutationPost, mutationPatch, mutationDelete, queryClient } =
    useCustomQuery();
  const setOpenAlert = useSetRecoilState(openAlertState);
  const setAlertType = useSetRecoilState(alertTypeState);
  const [dropdownUser, setDropdownUser] = useRecoilState(dropdownUserState);
  const call: { [key: string]: MutationType } = {
    post: mutationPost,
    patch: mutationPatch,
    delete: mutationDelete,
  };

  const { mutate } = call[method](api, options);

  const onSuccess = () => {
    setAlertType('success');
    setOpenAlert(true);
    keys?.map((key) => queryClient.invalidateQueries(key));
    if (dropdownUser) setDropdownUser('');
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
