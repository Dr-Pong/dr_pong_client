import useTranslation from 'next-translate/useTranslation';

import { useState } from 'react';

import { Participant } from 'types/chatTypes';
import { Friend, FriendBoxType } from 'types/friendTypes';

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
        searchKey={searchKey}
        setSearchKey={setSearchKey}
        placeHolder={t('search by nickname')}
      />
      <div className={styles.friendList}>
        {filteredFriends.map((friend) => {
          return (
            <FriendBox
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
