import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React, { useState } from 'react';

import PageHeader from 'components/global/PageHeader';
import MatchHistory from 'components/records/MatchHistory';

import styles from 'styles/records/Records.module.scss';

import SearchBar from '../../components/global/SearchBar';

export default function MatchHistoryPage() {
  const router = useRouter();
  const { t } = useTranslation('records');
  const defaultNickname = router.query.nickname as string; // TODO: nickname error handle when undefined or arr
  const [nickname, setNickname] = useState(defaultNickname);

  return (
    <div className={styles.matchHistoryPageContainer}>
      <PageHeader title={t('Match History')} button={null} />
      <SearchBar onSubmit={setNickname} initValue={defaultNickname} />
      <MatchHistory key={nickname} nickname={nickname} />
    </div>
  );
}
