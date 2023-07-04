import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { FormEvent, ReactElement, useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';

import { userState } from 'recoils/user';

import { ButtonDesign } from 'types/buttonTypes';

import instance from 'utils/axios';

import RelationButton from 'components/friends/RelationButton';
import SearchBar from 'components/global/SearchBar';
import UserBox from 'components/global/UserBox';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/SearchUser.module.scss';

const button: ButtonDesign = {
  style: 'round',
  color: 'opaque',
};

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
          const {
            nickname,
            image: { url: imgUrl },
          } = userDetail;
          setResult(
            <UserBox type='add' friend={{ nickname, imgUrl }}>
              {relation.status === 'none' && (
                <RelationButton
                  button={button}
                  type='friendAdd'
                  target={nickname}
                >
                  <IoMdAdd />
                </RelationButton>
              )}
            </UserBox>
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
