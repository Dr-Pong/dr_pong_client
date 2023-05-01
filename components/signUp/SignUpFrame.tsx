import useTranslation from 'next-translate/useTranslation';
import { Value } from 'sass';

import { useState } from 'react';
import { useQueryClient } from 'react-query';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/signUp/SignUp.module.scss';

import ProfileFields from './ProfileFields';
import Warnings from './Warnings';

export default function SignUpFrame() {
  const { t } = useTranslation('signUp');
  const { mutationPost } = useCustomQuery();
  const [wrongFields, setWrongFields] = useState<string[]>([]);

  // const validateNickname = (nickname: string | undefined) => {
  //   if (!nickname) setWrongFields([...wrongFields, 'nickname']);
  // };

  // const validateImgId = (imgId: string | undefined) => {
  //   if (!imgId) setWrongFields([...wrongFields, 'imgId']);
  // };

  const signUp = () => {
    setWrongFields([]);
    const nickname = document.querySelector(
      'input[type=text][name=nickname]'
    )?.value;
    const imgId = document.querySelector(
      'input[type=radio][name=userImage]:checked'
    )?.id;

    if (!nickname || !imgId) {
      console.log('invalid profile');
      return;
    }
    // validateNickname(nickname);
    // validateImgId(imgId);
    // console.log(wrongFields);
    // if (wrongFields.length) return;

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
      <ProfileFields />
      <Warnings wrongFields={wrongFields} />
      <BasicButton style='basic' color='black' handleButtonClick={signUp}>
        {t('sign up')}
      </BasicButton>
    </div>
  );
}
