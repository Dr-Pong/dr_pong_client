import React from 'react';

import { Activity, Friend, FriendTab } from 'types/friendTypes';

import useModalProvider from 'hooks/useModalProvider';

import FriendButtons from 'components/friends/FriendButtons';

import styles from 'styles/friends/FriendBox.module.scss';

type FriendBoxProps = {
  tab: FriendTab;
  friend: Friend;
  status?: Activity;
};

export default function FriendBox({ tab, friend, status }: FriendBoxProps) {
  const { nickname, imgUrl } = friend;
  const { useProfileModal } = useModalProvider();

  const handleProfileClick = () => {
    useProfileModal(nickname);
  };

  return (
    <div className={styles.friendBoxContainer}>
      <div className={styles.imageStatusWrap}>
        <img
          onClick={handleProfileClick}
          className={styles.img}
          src={imgUrl}
          alt={`photo of ${nickname}`}
        />
        {status && (
          <div className={`${styles.statusSignal} ${styles[status]}`}></div>
        )}
      </div>
      <div className={styles.nickname} onClick={handleProfileClick}>
        {nickname}
      </div>
      <FriendButtons tab={tab} nickname={friend.nickname} />
    </div>
  );
}
