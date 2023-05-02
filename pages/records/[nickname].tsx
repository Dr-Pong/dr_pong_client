import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React from 'react';

import PageHeader from 'components/global/PageHeader';
import MatchHistory from 'components/records/MatchHistory';

import styles from 'styles/matchHistory/MatchHistory.module.scss';

export default function matchHistory() {
  const router = useRouter();
  const { t } = useTranslation('records');
  const query = router.query.nickname as string; // TODO: nickname error handle when undefined or arr
  return (
    <div className={styles.matchHistoryPageContainer}>
      <PageHeader title={t('Match History')} button={null} />
      <div className={styles.searchBar}></div>
      <MatchHistory query={query} />
    </div>
  );
}
