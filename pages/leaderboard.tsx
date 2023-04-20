import { useTranslation } from 'react-i18next';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/pages/leaderboard.module.scss';

export default function leaderboard() {
  const { t } = useTranslation(['page']);
  return (
    <div className={styles.leaderboardPageContainer}>
      <PageHeader title={t('Leaderboard')} button={null} />
    </div>
  );
}
