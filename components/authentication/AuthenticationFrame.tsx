import useTranslation from 'next-translate/useTranslation';

import { useState } from 'react';

import useAuthHandler from 'hooks/useAuthHandler';
import useCustomQuery from 'hooks/useCustomQuery';

import NumberInputBox from 'components/authentication/NumberInputBox';
import SubmitButton from 'components/global/buttons/SubmitButton';

import styles from 'styles/authentication/Authentication.module.scss';

export default function AuthenticationFrame() {
  const { t } = useTranslation('authentication');
  const { mutationPost } = useCustomQuery();
  const [code, setCode] = useState<string>('');
  const { onAuthSuccess, onAuthFailure } = useAuthHandler();

  const checkOTPValidity = () => {
    mutationPost('/auth/tfa/otp', {
      onSuccess: onAuthSuccess,
      onError: onAuthFailure,
    }).mutate({ password: code });
  };

  return (
    <div className={styles.authenticationFrame}>
      <NumberInputBox setCode={setCode} boxNumber={6} />
      <SubmitButton
        style='basic'
        color='black'
        handleButtonClick={checkOTPValidity}
      >
        {t('submit')}
      </SubmitButton>
    </div>
  );
}
