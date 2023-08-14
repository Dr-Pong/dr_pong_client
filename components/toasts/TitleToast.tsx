import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import styles from 'styles/toasts/TitleToast.module.scss';

export default function TitleToast({
  title,
}: {
  title: {
    title: string;
  };
}) {
  const { t } = useTranslation('common');

  return (
    <div className={styles.titleToastContainer}>
      <div className={styles.titleName}>{`『${title.title}』`}</div>
      <div className={styles.titleToastMessage}>
        {`${t('title achieved')}!`}
      </div>
    </div>
  );
}
