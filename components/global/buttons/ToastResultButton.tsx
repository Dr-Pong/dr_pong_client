//친구수락 -> 토스트
// 친구거절 -> 토스트
// 차단해제 -> 토스트
// 친구추가 -> 토스트
//
// 게임초대 -> 토스트
// 유저차단 -> 토스트
// 차단해제 -> 토스트
// 친구추가 -> 토스트;
import React from 'react';

import { ButtonProps } from 'types/buttonTypes';

import useCustomQuery, { MutationType } from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

export default function ToastResultButton({
  request,
  buttonProps,
}: {
  request: {
    api: string;
    method: 'post' | 'delete' | 'patch';
    options?: object;
    body?: object;
  };
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
