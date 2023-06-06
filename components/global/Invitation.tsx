import useTranslation from 'next-translate/useTranslation';

import { useState } from 'react';

import useFriendsQuery from 'hooks/useFriendsQuery';
import useRelationButtons from 'hooks/useRelationButtons';

import SearchBar from 'components/global/SearchBar';

import { Friend } from 'types/friendTypes';
import { ButtonDesign } from 'types/buttonTypes';
import { Participant } from 'types/chatTypes';

import { GrAddCircle } from 'react-icons/gr';

import styles from 'styles/global/Invitation.module.scss';

const buttonDesign: ButtonDesign = {
  style: 'round',
  color: 'opaque',
};

export default function Invitation({
  invitationType,
  roomId,
  participants
}: {
  invitationType: string,
  roomId: string,
  participants: Participant[]
}) {
  const { t } = useTranslation('friends');
  const { allListGet } = useFriendsQuery();
  const { channelInvitation, gameInvitation }
    = useRelationButtons(buttonDesign, roomId);
  const [searchKey, setSearchKey] = useState<string>('');
  const [friends, setFriends] = useState<Friend[]>([]);
  const { isLoading, isError } = allListGet(setFriends);

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;

  const filteredFriends: Friend[] = friends.filter((friend) => {
    const isDuplicate = participants.some(
      (participant) => participant.nickname === friend.nickname
    );
    return friend.nickname.includes(searchKey) && !isDuplicate;
  });

  return (
    <div className={styles.invitationModal}>
      <div className={styles.searchBar}>
        <SearchBar
          searchKey={searchKey}
          setSearchKey={setSearchKey}
          placeHolder={t('Search by nickname')}
        />
      </div>
      <div className={styles.friendList}>
        {filteredFriends.map((friend) => {
          return (
            <div className={styles.friendBox}>
              <div className={styles.friendStatus}>
                <img className={styles.img} src={friend.imgUrl} />
                {friend.status && (
                  <div className={`${styles.statusSignal} ${styles[friend.status]}`}></div>
                )}
              </div>
              <div className={styles.nickname}>
                {friend.nickname}
              </div>
              <div className={styles.inviteButton}>
                {invitationType === 'channel'
                  ? channelInvitation(<GrAddCircle />, friend.nickname)
                  : gameInvitation(<GrAddCircle />, friend.nickname)}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  );
}
