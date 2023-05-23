import useTranslation from 'next-translate/useTranslation';

import { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import LoginFilter from 'components/layouts/LoginFilter';
import UtilLayout from 'components/layouts/UtilLayout';
import LeaderboardFrame from 'components/leaderboard/LeaderboardFrame';

import styles from 'styles/leaderboard/Leaderboard.module.scss';

export default function Leaderboard() {
  const { t } = useTranslation('leaderboard');
  return (
    <div className={styles.leaderboardPageContainer}>
      <PageHeader title={t('Leaderboard')} />
      <LeaderboardFrame />
    </div>
  );
}

Leaderboard.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <UtilLayout>{page}</UtilLayout>
    </LoginFilter>
  );
};
