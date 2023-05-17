import React from 'react';

import { Friend, FriendTab } from 'types/friendTypes';

import FriendButtons from 'components/friends/FriendButtons';
import StatusDisplay from 'components/friends/StatusDisplay';

import styles from 'styles/friends/FriendBox.module.scss';

export default function FriendBox({
  tab,
  friend,
}: {
  tab: FriendTab;
  friend: Friend;
}) {
  const { nickname, status, imgUrl } = friend;
  return (
    <div className={styles.friendBox}>
      <StatusDisplay status={status}>
        <img className={styles.img} src={imgUrl} alt={`photo of ${nickname}`} />
      </StatusDisplay>
      <div className={styles.nickname}>{nickname}</div>
      <FriendButtons tab={tab} nickname={nickname} />
    </div>
  );
}
