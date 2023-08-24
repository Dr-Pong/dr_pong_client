import useTranslation from 'next-translate/useTranslation';

import React, { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';
import Footer from 'components/layouts/Footer';
import LeaderboardFrame from 'components/leaderboard/LeaderboardFrame';

import styles from 'styles/leaderboard/Leaderboard.module.scss';

export default function Leaderboard() {
  const { t } = useTranslation('leaderboard');
  return (
    <div className={styles.leaderboardPageContainer}>
      <PageHeader title={t('Leaderboard')} />
      <LeaderboardFrame />
      <Footer />
    </div>
  );
}

Leaderboard.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
