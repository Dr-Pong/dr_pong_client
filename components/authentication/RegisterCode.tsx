import { useState } from 'react';

import { AuthCode } from 'types/authTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

import styles from 'styles/authentication/RegisterCode.module.scss';

export default function RegisterCode() {
  const { get } = useCustomQuery();
  const [registerCode, setRegisterCode] =
    useState<AuthCode>(defaultRegisterCode);
  const { data, isLoading, isError } = get(
    'authTfa',
    '/auth/tfa',
    setRegisterCode
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.CodeContainer}>
      <img
        className={styles.codeImage}
        src='https://upload.wikimedia.org/wikipedia/commons/thumb/d/d0/QR_code_for_mobile_English_Wikipedia.svg/440px-QR_code_for_mobile_English_Wikipedia.svg.png'
        // src={registerCode.qrCode}
        alt='QRCode'
      />
      <div className={styles.codeNumbers}>{registerCode.secretKey}</div>
    </div>
  );
}

const defaultRegisterCode: AuthCode = {
  redirectionUrl: '',
  qrCode: '',
  secretKey: '',
};
