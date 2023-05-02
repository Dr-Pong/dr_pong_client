import useTranslation from 'next-translate/useTranslation';

import { useState } from 'react';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/signUp/SignUp.module.scss';

import SignUpFields from './SignUpFields';
import Warnings from './Warnings';

export default function SignUpFrame() {
  const { t } = useTranslation('signUp');
  const { mutationPost } = useCustomQuery();
  const [wrongFields, setWrongFields] = useState<string[]>([]);

  const isValidImgId = (imgId: string | undefined) => {
    if (!imgId) {
      setWrongFields(['imgId']);
      return false;
    }
    return true;
  };

  const isValidNickname = (nickname: string) => {
    const loginIdRex = /^[a-zA-Z0-9]{3,15}$/g;

    if (!loginIdRex.test(nickname)) {
      setWrongFields(['nickname']);
      return false;
    }
    return true;
  };

  const signUp = () => {
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

    mutationPost.mutate(
      {
        path: '/signup',
        body: {
          nickname: nickname,
          imgId: imgId,
        },
      },
      {
        onSuccess: () => {
          console.log(nickname, imgId);
        },
        onError: () => {
          console.log('error');
        },
      }
    );
  };

  return (
    <div className={styles.signUpFrame}>
      <SignUpFields />
      <Warnings wrongFields={wrongFields} />
      <BasicButton style='basic' color='black' handleButtonClick={signUp}>
        {t('sign up')}
      </BasicButton>
    </div>
  );
}
