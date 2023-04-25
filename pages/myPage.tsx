import React from 'react';
import useTranslation from 'next-translate/useTranslation';

import PageHeader from 'components/global/PageHeader';
import MyPageFrame from 'components/myPage/MyPageFrame';

import styles from 'styles/myPage/MyPage.module.scss';

export default function MyPage() {
  const { t } = useTranslation('myPage');
  return (
    <div className={styles.myPageContainer}>
      <PageHeader title={t('My Page')} button={null} />
      <MyPageFrame />
    </div>
  );
}
