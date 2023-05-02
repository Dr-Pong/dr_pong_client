import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React, { useState } from 'react';

import PageHeader from 'components/global/PageHeader';
import MatchHistory from 'components/records/MatchHistory';

import styles from 'styles/matchHistory/MatchHistory.module.scss';

export default function MatchHistoryPage() {
  const router = useRouter();
  const { t } = useTranslation('records');
  const query = router.query.nickname as string; // TODO: nickname error handle when undefined or arr
  const [searchQuery, setSearchQuery] = useState(query);
  const [nickname, setNickname] = useState(query);
  function handleSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setNickname(searchQuery);
    const newQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/records/${newQuery}/`);
  }

  function handleSearchQueryChange(event: React.ChangeEvent<HTMLInputElement>) {
    setSearchQuery(event.target.value);
  }

  return (
    <div className={styles.matchHistoryPageContainer}>
      <PageHeader title={t('Match History')} button={null} />
      <form onSubmit={handleSearch} className={styles.searchBar}>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchQueryChange}
          placeholder={'Search by nickname'}
        />
        <button type='submit'>{'Search'}</button>
      </form>
      <MatchHistory key={nickname} query={nickname} />
    </div>
  );
}
