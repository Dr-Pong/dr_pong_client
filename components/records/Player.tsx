import React from 'react';

import styles from 'styles/records/Player.module.scss';

type PlayerProps = {
  nickname: string;
  imgUrl: string;
};

export default function Player({ nickname, imgUrl }: PlayerProps) {
  return (
    <div className={styles.playerContainer}>
      <img src={imgUrl}></img>
      <div>{nickname}</div>
    </div>
  );
}
