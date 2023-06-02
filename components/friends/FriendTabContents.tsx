import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { UseQueryResult } from 'react-query';

import { friendsTabState } from 'recoils/friends';

import { Friend } from 'types/friendTypes';

import useFriendsQuery from 'hooks/useFriendsQuery';
import useModalProvider from 'hooks/useModalProvider';

import FriendBox from 'components/friends/FriendBox';
import SearchBar from 'components/friends/SearchBar';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendTabContents.module.scss';

export default function FriendTabContents() {
  const { t } = useTranslation('friends');
  const { useFriendFinderModal } = useModalProvider();
  const { allListGet, pendingListGet, blockListGet } = useFriendsQuery();
  const tab = useRecoilValue(friendsTabState);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');

  const query: {
    [key: string]: (setBlocks: (f: Friend[]) => void) => UseQueryResult;
  } = {
    all: allListGet,
    pending: pendingListGet,
    block: blockListGet,
  };

  const { isLoading, isError } = query[tab](setFriends);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  return (
    <div className={styles.friendTabContentsContainer}>
      <div className={styles.utilsWrap}>
        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          placeHolder={t('Search by nickname')}
        />
        {tab === 'all' && (
          <BasicButton
            style={'square'}
            color={'pink'}
            handleButtonClick={useFriendFinderModal}
          >
            <IoMdAdd />
          </BasicButton>
        )}
      </div>
      <div className={styles.friendList}>
        {friends
          .filter((friend) => friend.nickname.includes(searchKey))
          .map((friend) => {
            return <FriendBox key={friend.nickname} friend={friend} />;
          })}
      </div>
    </div>
  );
}
