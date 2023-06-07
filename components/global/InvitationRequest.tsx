import { useState } from 'react';

import useFriendsQuery from 'hooks/useFriendsQuery';
import useRelationButtons from 'hooks/useRelationButtons';

import SearchBar from 'components/global/SearchBar';
import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

import { Friend } from 'types/friendTypes';
import { ButtonDesign } from 'types/buttonTypes';
import { Participant } from 'types/chatTypes';

import { GrAddCircle, GrGamepad } from 'react-icons/gr';

import styles from 'styles/global/InvitationRequest.module.scss';

const buttonDesign: ButtonDesign = {
  style: 'round',
  color: 'opaque',
};

type InvitationProps = {
  invitationType: string;
  roomId?: string;
  participants?: Participant[];
}

export default function InvitationRequest({
  invitationType,
  roomId,
  participants
}: InvitationProps) {
  const { allListGet } = useFriendsQuery();
  const { channelInvitation, gameInvitation }
    = useRelationButtons(buttonDesign, roomId as string);
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
      <div className={styles.searchBar}>
        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          placeHolder='Search by nickname'
        />
      </div>
      <div className={styles.friendList}>
        {filteredFriends.map((friend) => {
          return (
            <div className={styles.friendBox}>
              <div className={styles.friendStatus}>
                <img className={styles.img} src={friend.imgUrl} />
                {friend.status && (
                  <div className={
                    `${styles.statusSignal} ${styles[friend.status]}`
                  } />
                )}
              </div>
              <div className={styles.nickname}>
                {friend.nickname}
              </div>
              <div className={styles.inviteButton}>
                {invitationType === 'channel'
                  ? channelInvitation(<GrAddCircle />, friend.nickname)
                  : gameInvitation(<GrGamepad />, friend.nickname)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
