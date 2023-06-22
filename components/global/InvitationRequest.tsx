import useTranslation from 'next-translate/useTranslation';

import React, { useEffect, useState } from 'react';

import { Participant } from 'types/chatTypes';
import { Activity, Friend, FriendBoxType } from 'types/friendTypes';

import useChatSocket from 'hooks/useChatSocket';
import useFriendsQuery from 'hooks/useFriendsQuery';

import FriendBox from 'components/friends/FriendBox';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import SearchBar from 'components/global/SearchBar';

import styles from 'styles/global/InvitationRequest.module.scss';

type InvitationProps = {
  invitationType: string;
  roomId?: string;
  participants?: Participant[];
};

export default function InvitationRequest({
  invitationType,
  roomId,
  participants,
}: InvitationProps) {
  const { t } = useTranslation('common');
  const { allListGet } = useFriendsQuery();
  const [searchKey, setSearchKey] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const { isLoading, isError } = allListGet(setFriends);
  const [chatSocket] = useChatSocket();

  useEffect(() => {
    chatSocket.on('friends', (stats: { [nickname: string]: Activity }) => {
      setFriends((prev) =>
        prev.map((friend) => {
          const stat = stats[friend.nickname];
          if (stat) friend.status = stat;
          return friend;
        })
      );
    });
    return () => {
      chatSocket.off('friends');
    };
  }, []);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  const filteredFriends: Friend[] = friends.filter((friend) => {
    const notDuplicate = !participants?.some(
      (participant) => participant.nickname === friend.nickname
    );
    return friend.nickname.includes(searchKey) && notDuplicate;
  });

  return (
    <div className={styles.invitationModal}>
      <SearchBar
        inputId='searchFriendInput'
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeHolder={t('search by nickname')}
      />
      <div className={styles.friendList}>
        {filteredFriends.map((friend) => {
          return (
            <FriendBox
              key={friend.nickname}
              type={invitationType as FriendBoxType}
              friend={friend}
              roomId={roomId}
            />
          );
        })}
      </div>
    </div>
  );
}
