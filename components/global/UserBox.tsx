import React, { ReactNode } from 'react';

import { Friend } from 'types/friendTypes';

import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/global/UserBox.module.scss';

type UserBoxProps = {
  children: ReactNode;
  type: string;
  friend: Friend;
};

export default function UserBox({ children, type, friend }: UserBoxProps) {
  const { nickname, imgUrl } = friend;
  const { useProfileModal } = useModalProvider();

  const handleNicknameClick = (e: React.MouseEvent<HTMLElement>) => {
    const nickname = (e.target as HTMLElement).innerHTML;
    useProfileModal(nickname);
  };

  return (
    <div className={`${styles.userBoxContainer} ${styles[type]}`}>
      <img
        className={styles.userImage}
        src={imgUrl}
        alt={`photo of ${nickname}`}
      />
      <div className={styles.nickname} onClick={handleNicknameClick}>
        {nickname}
      </div>
      <div className={styles.button}>{children}</div>
    </div>
  );
}
