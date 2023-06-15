import useTranslation from 'next-translate/useTranslation';

import React, { FormEvent, useState } from 'react';

import { DetailDto } from 'types/userTypes';

import instance from 'utils/axios';

import FriendBox from 'components/friends/FriendBox';
import SearchBar from 'components/global/SearchBar';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/SearchUser.module.scss';

export default function SearchUser() {
  const { t } = useTranslation('friends');
  const [noSuchUser, setNoSuchUser] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [detailDto, setDetailDto] = useState<DetailDto | null>(null);

  const handleUserSearch = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery) {
      try {
        const res = await instance.get(`users/${searchQuery}/detail`);
        const data = res.data;
        setDetailDto(data);
        setNickname(searchQuery);
        setNoSuchUser(false);
      } catch (error) {
        setNoSuchUser(true);
      }
    } else {
      setNoSuchUser(true);
    }
  };

  return (
    <div className={styles.searchUserContainer}>
      <div className={styles.searchBar}>
        <SearchBar
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
      <div className={styles.results}>
        {detailDto === null ? (noSuchUser &&
          <div className={styles.noResult}>{t('no user')}</div>
        ) : (
          <FriendBox
            key={searchQuery}
            friend={{
              nickname: nickname,
              imgUrl: detailDto.image.url,
            }}
            type='find'
          />
        )}
      </div>
    </div>
  );
}
