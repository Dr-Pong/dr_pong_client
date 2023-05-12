import { AxiosError, AxiosResponse } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { useRef } from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import BasicButton from 'components/global/buttons/BasicButton';

export default function TfaField() {
  const { t } = useTranslation('settings');
  const { nickname } = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    'usersTfa',
    `/users/${nickname}/tfa`
  );
  const { mutationPost, mutationDelete } = useCustomQuery();
  const { useTfaRegisterModal } = useModalProvider();
  const inputRef = useRef<any>([]);

  const { mutate: mutateDelete } = mutationDelete(`/auth/tfa`, {
    onSuccess: () => {},
    onError: () => {},
  });

  const { mutate: mutatePost } = mutationPost(`/auth/tfa/otp`, {
    onSuccess: () => {},
    onError: () => {},
  });

  if (isLoading) return null;
  const { tfaOn } = data;

  const enableTfa = () => {
    useTfaRegisterModal(inputRef, submitOTP);
  };

  const disableTfa = () => {
    mutateDelete();
  };

  const submitOTP = () => {
    mutatePost({
      password: inputRef.current.map((input: any) => input.value).join(''),
    });
  };

  const contents = {
    enable: (
      <div>
        {t('enable')} <AiFillLock />
      </div>
    ),
    disable: (
      <div>
        {t('disable')} <AiFillUnlock />
      </div>
    ),
  };

  return (
    <div>
      <BasicButton
        style='basic'
        color='black'
        handleButtonClick={tfaOn ? disableTfa : enableTfa}
      >
        {tfaOn ? contents.disable : contents.enable}
      </BasicButton>
    </div>
  );
}
