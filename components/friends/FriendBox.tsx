import React from 'react';

import { Activity, Friend, FriendBoxType } from 'types/friendTypes';

import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/friends/FriendBox.module.scss';

type FriendBoxProps = {
  children: React.ReactNode;
  type: FriendBoxType;
  friend: Friend;
  status?: Activity;
};

export default function FriendBox({
  type,
  friend,
  status,
  children,
}: FriendBoxProps) {
  const { nickname, imgUrl } = friend;
  const { useProfileModal } = useModalProvider();

  const handleNicknameClick = (e: React.MouseEvent<HTMLElement>) => {
    const nickname = (e.target as HTMLElement).innerHTML;
    useProfileModal(nickname);
  };

  return (
    <div className={`${styles.friendBoxContainer} ${styles[type]}`}>
      <div className={styles.imageStatusWrap}>
        <img className={styles.img} src={imgUrl} alt={`photo of ${nickname}`} />
        {status && (
          <div className={`${styles.statusSignal} ${styles[status]}`}></div>
        )}
      </div>
      <div className={styles.nickname} onClick={handleNicknameClick}>
        {nickname}
      </div>
      {children}
    </div>
  );
}
