import useTranslation from 'next-translate/useTranslation';

import React, { useEffect, useState } from 'react';

import { Participant } from 'types/chatTypes';
import { Friend, FriendBoxType, Statuses } from 'types/friendTypes';

import useChatSocket from 'hooks/useChatSocket';
import useFriendsQuery from 'hooks/useFriendsQuery';

import FriendBox from 'components/friends/FriendBox';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import SearchBar from 'components/global/SearchBar';

import styles from 'styles/global/InvitationRequest.module.scss';

type InvitationProps = {
  invitationType: string;
  mode?: string;
  roomId?: string;
  participants?: Participant[];
};

export default function InvitationRequest({
  invitationType,
  mode,
  roomId,
  participants,
}: InvitationProps) {
  const { t } = useTranslation('common');
  const { allListGet } = useFriendsQuery();
  const [searchKey, setSearchKey] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [statuses, setStatuses] = useState<Statuses>({});
  const { isLoading, isError } = allListGet(setFriends);
  const [chatSocket] = useChatSocket();

  useEffect(() => {
    const friendStatusListener = (newStatuses: Statuses) => {
      setStatuses((prev) => {
        return {
          ...prev,
          ...newStatuses,
        };
      });
    };
    chatSocket.on('friends', friendStatusListener);
    return () => {
      chatSocket.off('friends', friendStatusListener);
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
              status={statuses[friend.nickname]}
              mode={mode}
              roomId={roomId}
            />
          );
        })}
      </div>
    </div>
  );
}
