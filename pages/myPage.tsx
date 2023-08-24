import useTranslation from 'next-translate/useTranslation';

import React from 'react';
import { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';
import Footer from 'components/layouts/Footer';
import MyPageFrame from 'components/myPage/MyPageFrame';

import styles from 'styles/myPage/MyPage.module.scss';

export default function MyPage() {
  const { t } = useTranslation('myPage');
  return (
    <div className={styles.myPageContainer}>
      <PageHeader title={t('My Page')} />
      <MyPageFrame />
      <Footer />
    </div>
  );
}

MyPage.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
