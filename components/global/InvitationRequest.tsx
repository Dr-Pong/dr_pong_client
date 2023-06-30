import useTranslation from 'next-translate/useTranslation';

import React, { useEffect, useState } from 'react';

import { Participant } from 'types/chatTypes';
import { Friend, Statuses } from 'types/friendTypes';
import { InvitationType } from 'types/notificationTypes';

import useChatSocket from 'hooks/useChatSocket';
import useFriendsQuery from 'hooks/useFriendsQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import FriendInvitationBox from 'components/global/FriendInvitationBox';
import LoadingSpinner from 'components/global/LoadingSpinner';
import SearchBar from 'components/global/SearchBar';

import styles from 'styles/global/InvitationRequest.module.scss';

type InvitationProps = {
  invitationType: InvitationType;
  invitationArg: string;
  participants?: Participant[];
};

export default function InvitationRequest({
  invitationType,
  invitationArg,
  participants,
}: InvitationProps) {
  const { t } = useTranslation('common');
  const { allListGet } = useFriendsQuery();
  const [searchKey, setSearchKey] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const [statuses, setStatuses] = useState<Statuses>({});
  const { isLoading, isError } = allListGet(setFriends);
  const [chatSocket] = useChatSocket('friends');

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
            <FriendInvitationBox
              key={friend.nickname}
              friend={friend}
              status={statuses[friend.nickname]}
              type={invitationType as InvitationType}
              invitationArg={invitationArg}
            />
          );
        })}
      </div>
    </div>
  );
}
