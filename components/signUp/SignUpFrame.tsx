import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import { useState } from 'react';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';
import SignUpFields from 'components/signUp/SignUpFields';
import Warnings from 'components/signUp/Warnings';

import styles from 'styles/signUp/SignUp.module.scss';

export default function SignUpFrame() {
  const { t } = useTranslation('signUp');
  const { mutationPost } = useCustomQuery();
  const router = useRouter();
  const [wrongFields, setWrongFields] = useState<string[]>([]);
  const userSignUpMutation = mutationPost('/signup', {
    onSuccess: () => {
      router.push('/');
    },
    onError: () => {},
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

    userSignUpMutation.mutate({
      nickname: nickname,
      imgId: imgId,
    });
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
