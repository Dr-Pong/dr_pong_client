import { useEffect, useState } from 'react';

import { Friend, Statuses } from 'types/friendTypes';

import useChatSocket from 'hooks/useChatSocket';

import GameInvitationButton from 'components/game/GameInvitationButton';
import UserBox from 'components/global/UserBox';

import styles from 'styles/modals/Modal.module.scss';

type GameInviteableFriendListProps = {
  friends: Friend[];
  mode: string;
};

export default function GameInviteableFriendList({
  friends,
  mode,
}: GameInviteableFriendListProps) {
  const [statuses, setStatuses] = useState<Statuses>({});
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

  const filterOnlineFriends = () => {
    return friends.filter(({ nickname }) => statuses[nickname] === 'online');
  };

  return (
    <div className={styles.inviteableFriendList}>
      {filterOnlineFriends().map((friend) => (
        <UserBox key={friend.nickname} type='invitation' friend={friend}>
          <GameInvitationButton nickname={friend.nickname} mode={mode} />
        </UserBox>
      ))}
    </div>
  );
}
