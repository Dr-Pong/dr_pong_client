import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { UseQueryResult } from 'react-query';

import { friendsTabState } from 'recoils/friends';

import { Friend, Statuses } from 'types/friendTypes';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';
import useFriendsQuery from 'hooks/useFriendsQuery';
import useModalProvider from 'hooks/useModalProvider';

import FriendBox from 'components/friends/FriendBox';
import FriendButtons from 'components/friends/FriendButtons';
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
  const [statuses, setStatuses] = useState<Statuses>({});
  const [searchKey, setSearchKey] = useState<string>('');
  const [friendsChatSocket] = useChatSocket('friends');
  const [globalChatSocket] = useChatSocket('global');

  useEffect(() => {
    friendsChatSocket.disconnect();
    friendsChatSocket.connect();
    const friendStatusListener = (newStatuses: Statuses) => {
      setStatuses((prev) => {
        return {
          ...prev,
          ...newStatuses,
        };
      });
    };
    const friendsListener = () => {
      queryClient.invalidateQueries('allfriends');
    };
    const pendingsListener = () => {
      queryClient.invalidateQueries('pendings');
    };

    if (tab === 'all') {
      friendsChatSocket.on('friends', friendStatusListener);
      friendsChatSocket.on('friend', friendsListener);
      globalChatSocket.on('friend', friendsListener);
    }
    if (tab === 'pending') {
      friendsChatSocket.on('friend', pendingsListener);
      globalChatSocket.on('friend', pendingsListener);
    }
    return () => {
      friendsChatSocket.off('friends', friendStatusListener);
      friendsChatSocket.off('friend', friendsListener);
      globalChatSocket.off('friend', friendsListener);
      friendsChatSocket.off('friend', pendingsListener);
      globalChatSocket.off('friend', pendingsListener);
    };
  }, []);

  const query: {
    [key: string]: (setBlocks: (f: Friend[]) => void) => UseQueryResult;
  } = {
    all: allListGet,
    pending: pendingListGet,
    blocked: blockListGet,
  };

  const { isLoading, isError, error } = query[tab](setFriends);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

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
              <FriendBox
                key={friend.nickname}
                friend={friend}
                status={statuses[friend.nickname]}
                type={tab}
              >
                <FriendButtons type={tab} nickname={friend.nickname} />
              </FriendBox>
            );
          })}
      </div>
    </div>
  );
}
