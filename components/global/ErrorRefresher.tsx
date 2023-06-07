import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import BasicButton from 'components/global/buttons/BasicButton';

import { BiError } from 'react-icons/bi';

import styles from 'styles/global/ErrorRefresher.module.scss';

export default function ErrorRefresher() {
  const { t } = useTranslation('common');

  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className={styles.errorContainer}>
      <BiError className={styles.errorIcon} />
      <div className={styles.errorMsg}>
        {t('Fetch error')}
      </div>
      <BasicButton
        style='basic'
        color='purple'
        handleButtonClick={handleRefresh}>
        {t('Refresh')}
      </BasicButton>
    </div>
  );
};
