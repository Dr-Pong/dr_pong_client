import useTranslation from 'next-translate/useTranslation';

import NumberInputBox from 'components/authentication/NumberInputBox';
import SubmitButton from 'components/global/buttons/SubmitButton';

import styles from 'styles/authentication/Authentication.module.scss';

import Code from './Code';

export default function AuthenticationFrame() {
  const { t } = useTranslation('authentication');

  const checkOTPValidity = () => {
    // POST
  };

  return (
    <div className={styles.authenticationFrame}>
      <Code />
      <NumberInputBox boxNumber={6} />
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
