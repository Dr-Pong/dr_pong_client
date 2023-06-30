import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import { BiError } from 'react-icons/bi';

import useAuthHandler from 'hooks/useAuthHandler';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/global/ErrorRefresher.module.scss';

export default function ErrorRefresher({ error }: { error?: unknown }) {
  const { t } = useTranslation('common');
  const { onUnauthorizedAttempt } = useAuthHandler();
  const status = (error as AxiosError)?.response?.status;

  if (status === 401) {
    onUnauthorizedAttempt();
    return null;
  }
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorContainer}>
      <BiError className={styles.errorIcon} />
      <div className={styles.errorMsg}>{t('Fetch error')}</div>
      <BasicButton
        style='basic'
        color='purple'
        handleButtonClick={handleRefresh}
      >
        {t('Refresh')}
      </BasicButton>
    </div>
  );
}
