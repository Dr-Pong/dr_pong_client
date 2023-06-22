import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { FormEvent, ReactElement, useEffect, useState } from 'react';

import { userState } from 'recoils/user';

import instance from 'utils/axios';

import FriendBox from 'components/friends/FriendBox';
import SearchBar from 'components/global/SearchBar';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/SearchUser.module.scss';

export default function SearchUser() {
  const { t } = useTranslation('friends');
  const { nickname: myName } = useRecoilValue(userState);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [result, setResult] = useState<ReactElement>(<></>);

  const handleUserSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const { data: userDetail } = await instance.get(
          `users/${searchQuery}/detail`
        );
        const { data: relation } = await instance.get(
          `/users/${myName}/relations/${searchQuery}`
        );
        if (
          userDetail &&
          userDetail.nickname !== myName &&
          relation &&
          relation.status !== 'blocked'
        ) {
          setResult(
            <FriendBox
              key={userDetail.nickname}
              friend={{
                nickname: userDetail.nickname,
                imgUrl: userDetail.image.url,
              }}
              type={relation.status === 'none' ? 'add' : 'none'}
            />
          );
        } else setResult(<div className={styles.noResult}>{t('no user')}</div>);
      } catch (e) {
        setResult(<div className={styles.noResult}>{t('no user')}</div>);
      }
    }
  };

  useEffect(() => {
    (document.getElementById('searchUserInput') as HTMLElement).focus();
  }, []);

  return (
    <div className={styles.searchUserContainer}>
      <div className={styles.searchBar}>
        <SearchBar
          inputId='searchUserInput'
          searchKey={searchQuery}
          setSearchKey={setSearchQuery}
          placeHolder={t('nickname')}
          handleOnSubmit={handleUserSearch}
        />
        <BasicButton
          style='short'
          color='pink'
          handleButtonClick={handleUserSearch}
        >
          {t('search')}
        </BasicButton>
      </div>
      <div className={styles.results}>{result}</div>
    </div>
  );
}
