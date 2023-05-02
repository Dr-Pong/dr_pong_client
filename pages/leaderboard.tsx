import useTranslation from 'next-translate/useTranslation';

import PageHeader from 'components/global/PageHeader';
import LeaderboardFrame from 'components/leaderboard/LeaderboardFrame';

import styles from 'styles/leaderboard/Leaderboard.module.scss';

export default function Leaderboard() {
  const { t } = useTranslation('leaderboard');
  return (
    <div className={styles.leaderboardPageContainer}>
      <PageHeader title={t('Leaderboard')} button={null} />
      <LeaderboardFrame />
    </div>
  );
}
