import React, { useState } from 'react';

import { AuthCode } from 'types/authTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/authentication/RegisterCode.module.scss';

export default function RegisterCode() {
  const { get } = useCustomQuery();
  const { data, isLoading, isError, error } = get('authTfa', '/auth/tfa');

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  const { qrCode, secretKey, redirectionUrl } = data;
  return (
    <div className={styles.codeContainer}>
      <img className={styles.codeImage} src={qrCode} alt='QRCode' />
      <div className={styles.codeNumbers}>{secretKey}</div>
      <a
        className={styles.redirectionUrl}
        href={redirectionUrl}
        target='_blank'
        rel='noreferrer'
      >
        {'Link for Mobile Device'}
      </a>
    </div>
  );
}

const defaultRegisterCode: AuthCode = {
  redirectionUrl: '',
  qrCode: '',
  secretKey: '',
};
