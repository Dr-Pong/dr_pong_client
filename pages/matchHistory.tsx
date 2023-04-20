import { useTranslation } from 'react-i18next';

import PageHeader from 'components/global/pageHeader';

import styles from 'styles/pages/matchHistory.module.scss';

export default function matchHistory() {
  const { t } = useTranslation(['page']);
  return (
    <div className={styles.matchHistoryPageContainer}>
      <PageHeader title={t('Match History')} button={null} />
    </div>
  );
}
