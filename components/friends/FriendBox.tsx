import React from 'react';

import { Friend, FriendTab, SearchUser } from 'types/friendTypes';

import useModalProvider from 'hooks/useModalProvider';

import FriendButtons from 'components/friends/FriendButtons';
import StatusDisplay from 'components/friends/StatusDisplay';

import styles from 'styles/friends/FriendBox.module.scss';

export default function FriendBox({
  tab,
  friend,
}: {
  tab: FriendTab | SearchUser;
  friend: Friend;
}) {
  const { nickname, status, imgUrl } = friend;
  const { useProfileModal } = useModalProvider();

  const handleNicknameClick = (e: React.MouseEvent<HTMLElement>) => {
    const nickname = (e.target as HTMLElement).innerHTML;
    useProfileModal(nickname);
  };

  return (
    <div className={styles.friendBox}>
      <StatusDisplay status={status}>
        <img className={styles.img} src={imgUrl} alt={`photo of ${nickname}`} />
      </StatusDisplay>
      <div className={styles.nickname} onClick={handleNicknameClick}>
        {nickname}
      </div>
      <FriendButtons tab={tab} nickname={nickname} />
    </div>
  );
}
