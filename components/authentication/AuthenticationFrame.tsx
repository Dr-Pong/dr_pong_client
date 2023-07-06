import useTranslation from 'next-translate/useTranslation';

import { FormEvent, useRef } from "react";

import useAuthHandler from 'hooks/useAuthHandler';
import useCustomQuery from 'hooks/useCustomQuery';

import NumberInputBox from 'components/authentication/NumberInputBox';
import SubmitButton from 'components/global/buttons/SubmitButton';

import styles from 'styles/authentication/Authentication.module.scss';

export default function AuthenticationFrame() {
  const { t } = useTranslation('authentication');
  const { mutationPost } = useCustomQuery();
  const inputRef = useRef<any>([]);
  const { onAuthSuccess, onSecondAuthFailure } = useAuthHandler();
  const { mutate } = mutationPost('/auth/tfa/otp', {
    onSuccess: onAuthSuccess,
    onError: onSecondAuthFailure,
  });
  const checkOTPValidity = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ password: extractOTP() });
  };

  const extractOTP = (): string => {
    return inputRef.current.map((input: any) => input.value).join('');
  };

  return (
    <div className={styles.authenticationFrame}>
      <NumberInputBox inputRef={inputRef} boxNumber={6} />
      <SubmitButton
        style='basic'
        color='purple'
        handleButtonClick={checkOTPValidity}
      >
        {t('submit')}
      </SubmitButton>
    </div>
  );
}
