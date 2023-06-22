import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { UseQueryResult } from 'react-query';

import { friendsTabState } from 'recoils/friends';

import { Activity, Friend } from 'types/friendTypes';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';
import useFriendsQuery from 'hooks/useFriendsQuery';
import useModalProvider from 'hooks/useModalProvider';

import FriendBox from 'components/friends/FriendBox';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import SearchBar from 'components/global/SearchBar';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/friends/FriendTabContents.module.scss';

export default function FriendTabContents() {
  const { t } = useTranslation('friends');
  const { queryClient } = useCustomQuery();
  const { useFriendRequestModal } = useModalProvider();
  const { allListGet, pendingListGet, blockListGet } = useFriendsQuery();
  const tab = useRecoilValue(friendsTabState);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [searchKey, setSearchKey] = useState<string>('');
  const [friendsChatSocket, disconnectFriendChatSocket] =
    useChatSocket('friends');
  const [globalChatSocket] = useChatSocket();

  useEffect(() => {
    friendsChatSocket.connect();
    const putFriendStatus = (stats: { [nickname: string]: Activity }) => {
      setFriends((prev) =>
        prev.map((friend) => {
          const stat = stats[friend.nickname];
          if (stat) friend.status = stat;
          return friend;
        })
      );
    };
    const invalidateAllFriends = () => {
      queryClient.invalidateQueries('allfriends');
    };
    const invalidatePendings = () => {
      queryClient.invalidateQueries('pendings');
    };

    if (tab === 'all') {
      friendsChatSocket.on('friends', putFriendStatus);
      globalChatSocket.on('friend', invalidateAllFriends);
    }
    if (tab === 'pending') {
      globalChatSocket.on('friend', invalidatePendings);
    }
    return () => {
      friendsChatSocket.off('friends', putFriendStatus);
      globalChatSocket.off('friend', invalidateAllFriends);
      globalChatSocket.off('friend', invalidatePendings);
      disconnectFriendChatSocket();
    };
  }, []);

  const query: {
    [key: string]: (setBlocks: (f: Friend[]) => void) => UseQueryResult;
  } = {
    all: allListGet,
    pending: pendingListGet,
    blocked: blockListGet,
  };

  const { isLoading, isError } = query[tab](setFriends);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.friendTabContentsContainer}>
      <div className={styles.utilsWrap}>
        <SearchBar
          inputId='searchFriendInput'
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          placeHolder={t('Search by nickname')}
        />
        {tab === 'all' && (
          <BasicButton
            style={'square'}
            color={'pink'}
            handleButtonClick={useFriendRequestModal}
          >
            <IoMdAdd />
          </BasicButton>
        )}
      </div>
      <div className={styles.friendList}>
        {friends
          .filter((friend) => friend.nickname.includes(searchKey))
          .map((friend) => {
            return (
              <FriendBox key={friend.nickname} friend={friend} type={tab} />
            );
          })}
      </div>
    </div>
  );
}
