import React from 'react';
import { useTranslation } from 'react-i18next';

import MyPageFrame from 'components/myPage/MyPageFrame';

import styles from 'styles/pages/myPage.module.scss';

import PageHeader from '../components/global/PageHeader';

export default function MyPage() {
  const { t } = useTranslation(['page']);
  return (
    <div className={styles.myPageContainer}>
      <PageHeader title={t('MyPage')} button={null} />
      <MyPageFrame />
    </div>
  );
}
