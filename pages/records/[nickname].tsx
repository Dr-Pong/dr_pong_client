import useTranslation from 'next-translate/useTranslation';

import { useRouter } from 'next/router';

import React, { ReactElement, useState } from 'react';

import PageHeader from 'components/global/PageHeader';
import SearchBar from 'components/global/SearchBar';
import SubmitButton from 'components/global/buttons/SubmitButton';
import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';
import RecordList from 'components/records/RecordList';

import styles from 'styles/records/Records.module.scss';

export default function Records() {
  const { t } = useTranslation('records');
  const router = useRouter();
  const defaultNickname = router.query.nickname as string; // TODO: nickname error handle when undefined or arr
  const [nickname, setNickname] = useState(defaultNickname);

  const handleNicknameSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/records/${nickname.trim()}/`);
  };

  return (
    <div className={styles.recordsPageContainer}>
      <PageHeader title={t('Match History')} />
      <div>
        <div className={styles.searchBar}>
          <SearchBar
            searchKey={nickname}
            setSearchKey={setNickname}
            placeHolder={t('nickname')}
            handleOnSubmit={handleNicknameSearch}
          />
          <SubmitButton
            style='short'
            color='pink'
            handleButtonClick={handleNicknameSearch}
          >
            {t('search')}
          </SubmitButton>
        </div>
        <RecordList key={nickname} nickname={nickname} />
      </div>
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
