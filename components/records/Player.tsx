import React from 'react';

import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/records/Player.module.scss';

type PlayerProps = {
  nickname: string;
  imgUrl: string;
};

export default function Player({ nickname, imgUrl }: PlayerProps) {
  const { useProfileModal } = useModalProvider();

  const handleProfileClick = () => {
    useProfileModal(nickname);
  };

  return (
    <div onClick={handleProfileClick} className={styles.playerContainer}>
      <img alt='profile image' src={imgUrl}></img>
      <div>{nickname}</div>
    </div>
  );
}
