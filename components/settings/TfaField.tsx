import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import React, { FormEvent, useRef } from 'react';
import { AiFillLock, AiFillUnlock } from 'react-icons/ai';

import { alertState } from 'recoils/alert';
import { userState } from 'recoils/user';

import useAuthHandler, { TokenResponse } from 'hooks/useAuthHandler';
import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/settings/Settings.module.scss';

export default function TfaField() {
  const { t } = useTranslation('common');
  const { nickname } = useRecoilValue(userState);
  const { get, queryClient } = useCustomQuery();
  const { data, isLoading } = get('usersTfa', `/users/${nickname}/tfa`);
  const { mutationPost, mutationDelete } = useCustomQuery();
  const { useTfaRegisterModal } = useUpperModalProvider();
  const { closeModal } = useModalProvider();
  const setAlert = useSetRecoilState(alertState);
  const { onSecondAuthRegisterSuccess } = useAuthHandler();
  const inputRef = useRef<any>([]);

  const { mutate: mutateDelete } = mutationDelete(`/auth/tfa`, {
    onSuccess: () => {
      queryClient.invalidateQueries('usersTfa');
      closeModal();
      setAlert({ type: 'success' });
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });

  const { mutate: mutatePost } = mutationPost(`/auth/tfa`, {
    onSuccess: (res: TokenResponse) => {
      onSecondAuthRegisterSuccess(res);
      setAlert({ type: 'success' });
    },
    onError: () => {
      setAlert({ type: 'failure' });
    },
  });

  const enableTfa = () => {
    useTfaRegisterModal(inputRef, submitOTP);
  };

  const disableTfa = () => {
    mutateDelete();
  };

  const submitOTP = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutatePost({
      password: inputRef.current.map((input: any) => input.value).join(''),
    });
  };

  const contents = {
    enable: (
      <div className={styles.buttonContent}>
        {t('enable')} <AiFillLock />
      </div>
    ),
    disable: (
      <div className={styles.buttonContent}>
        {t('disable')} <AiFillUnlock />
      </div>
    ),
  };

  return !data || isLoading ? (
    <BasicButton style='basic' color='purple'>
      {}
    </BasicButton>
  ) : (
    <BasicButton
      style='basic'
      color='purple'
      handleButtonClick={data.tfaOn ? disableTfa : enableTfa}
    >
      {data.tfaOn ? contents.disable : contents.enable}
    </BasicButton>
  );
}
