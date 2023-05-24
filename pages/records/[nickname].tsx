import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React, { ReactElement, useState } from 'react';

import PageHeader from 'components/global/PageHeader';
import SearchBar from 'components/global/SearchBar';
import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';
import MatchHistory from 'components/records/MatchHistory';

import styles from 'styles/records/Records.module.scss';

export default function Records() {
  const router = useRouter();
  const { t } = useTranslation('records');
  const defaultNickname = router.query.nickname as string; // TODO: nickname error handle when undefined or arr
  const [nickname, setNickname] = useState(defaultNickname);

  return (
    <div className={styles.recordsPageContainer}>
      <PageHeader title={t('Match History')} />
      <SearchBar onSubmit={setNickname} initValue={defaultNickname} />
      <MatchHistory key={nickname} nickname={nickname} />
    </div>
  );
}

Records.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <AppLayout>{page}</AppLayout>
    </LoginFilter>
  );
};
