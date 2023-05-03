import React from 'react';

import styles from 'styles/records/Player.module.scss';

export default function Player({
  nickname,
  imgUrl,
}: {
  nickname: string;
  imgUrl: string;
}) {
  return (
    <div className={styles.player}>
      <img src={imgUrl}></img>
      <div>{nickname}</div>
    </div>
  );
}
