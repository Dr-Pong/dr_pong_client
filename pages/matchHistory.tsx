import useTranslation from 'next-translate/useTranslation';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/matchHistory/MatchHistory.module.scss';

export default function matchHistory() {
  const { t } = useTranslation('matchHistory');
  return (
    <div className={styles.matchHistoryPageContainer}>
      <PageHeader title={t('Match History')} button={null} />
    </div>
  );
}
