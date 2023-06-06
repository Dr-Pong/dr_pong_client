import React, { useState } from 'react';

import instance from 'utils/axios';

import FriendBox from 'components/friends/FriendBox';
import { DetailDto } from 'types/userTypes';

import styles from 'styles/global/SearchBar.module.scss';

export default function SearchUser() {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [nickname, setNickname] = useState<string>('');
  const [detailDto, setDetailDto] = useState<DetailDto | null>(null);
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = (await instance.get(`/users/${searchQuery}/detail`)).data;
    setDetailDto(data);
    if (data) setNickname(searchQuery);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className={styles.searchUser}>
      <form className={styles.searchBar} onSubmit={handleOnSubmit}>
        <input
          type='text'
          value={searchQuery}
          onChange={handleOnChange}
          placeholder={'Search by nickname'}
        />
        <button type='submit'>{'Search'}</button>
      </form>
      <div className={styles.result}>
        {detailDto === null ? (
          <div className={styles.noResult}>no user found</div>
        ) : (
          <FriendBox
            key={searchQuery}
            friend={{
              nickname: nickname,
              imgUrl: detailDto.image.url,
            }}
          />
        )}
      </div>
    </div>
  );
}
