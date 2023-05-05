import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React, { useState } from 'react';
import { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import SearchBar from 'components/global/SearchBar';
import NavigationLayout from 'components/layouts/NavigationLayout';
import MatchHistory from 'components/records/MatchHistory';

import styles from 'styles/records/Records.module.scss';

export default function Records() {
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

Records.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};
