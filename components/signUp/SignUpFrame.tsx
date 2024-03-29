import { AxiosError } from 'axios';
import { NextApiResponse } from 'next';
import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import React from 'react';
import { useState } from 'react';

import { alertState } from 'recoils/alert';

import useAuthHandler from 'hooks/useAuthHandler';
import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';
import SignUpFields from 'components/signUp/SignUpFields';
import Warnings from 'components/signUp/Warnings';

import styles from 'styles/signUp/SignUp.module.scss';

export default function SignUpFrame() {
  const { t } = useTranslation('signUp');
  const { mutationPost } = useCustomQuery();
  const { onAuthSuccess } = useAuthHandler();
  const setAlert = useSetRecoilState(alertState);
  const [wrongFields, setWrongFields] = useState<string[]>([]);
  const userSignUpMutation = mutationPost('/auth/signup', {
    onSuccess: onAuthSuccess,
    onError: (e: AxiosError) => {
      if (e.response?.status === 409) {
        setAlert({ type: 'warning', message: t('Nickname already exists') });
      } else setAlert({ type: 'failure' });
    },
  });

  const isValidImgId = (imgId: string | undefined) => {
    if (!imgId) {
      setWrongFields(['imgId']);
      return false;
    }
    return true;
  };

  const isValidNickname = (nickname: string) => {
    const loginIdRex = /^[a-zA-Z0-9]{2,10}$/g;

    if (!loginIdRex.test(nickname)) {
      setWrongFields(['nickname']);
      return false;
    }
    return true;
  };

  const handleSignUp = () => {
    const imgId = (
      document.querySelector(
        'input[type=radio][name=userImage]:checked'
      ) as HTMLInputElement
    )?.id;
    const nickname = (
      document.querySelector(
        'input[type=text][name=nickname]'
      ) as HTMLInputElement
    )?.value;

    if (!isValidImgId(imgId)) return;
    if (!isValidNickname(nickname)) return;
    setWrongFields([]);

    userSignUpMutation.mutate({
      nickname: nickname,
      imgId: imgId,
    });
  };

  return (
    <div className={styles.signUpFrame}>
      <SignUpFields />
      <Warnings wrongFields={wrongFields} />
      <BasicButton style='basic' color='pink' handleButtonClick={handleSignUp}>
        {t('sign up')}
      </BasicButton>
    </div>
  );
}
