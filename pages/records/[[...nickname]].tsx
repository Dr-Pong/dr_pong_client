import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import Link from 'next/link';
import { useRouter } from 'next/router';

import React, { FormEvent, ReactElement, useState } from 'react';

import { userState } from 'recoils/user';

import PageHeader from 'components/global/PageHeader';
import SearchBar from 'components/global/SearchBar';
import SubmitButton from 'components/global/buttons/SubmitButton';
import AppLayout from 'components/layouts/AppLayout';
import RecordList from 'components/records/RecordList';

import styles from 'styles/records/Records.module.scss';

export default function Records() {
  const { t } = useTranslation('records');
  const router = useRouter();
  const user = useRecoilValue(userState);
  if (router.query.nickname && (router.query.nickname.length ?? 0) > 1) {
    router.push(`/records/${router.query.nickname[0]}`);
  }
  const defaultNickname = (router.query.nickname as string) || '';
  const [nickname, setNickname] = useState(defaultNickname);

  const handleNicknameSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    router.push(`/records/${nickname.trim()}`);
  };

  const isGuest = user.roleType === 'guest';

  return (
    <div className={styles.recordsPageContainer}>
      <PageHeader title={t('Match History')} />
      <div>
        <div className={styles.searchBar}>
          <SearchBar
            inputId='searchRecordInput'
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
        {isGuest ? (
          <div className={styles.newbieBox}>
            <div className={styles.loginSuggestion}>
              {t('How about logging in?')}
            </div>
            <Link href={'/login'} className={styles.loginButton}>
              {t('login')}
            </Link>
          </div>
        ) : (
          <RecordList key={defaultNickname} nickname={defaultNickname} />
        )}
      </div>
    </div>
  );
}

Records.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
