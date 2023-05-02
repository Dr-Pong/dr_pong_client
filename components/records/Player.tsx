import React from 'react';
export default function Player({
  nickname,
  imgUrl,
}: {
  nickname: string;
  imgUrl: string;
}) {
  return (
    <div>
      <img src={imgUrl}></img>
      <div>{nickname}</div>
    </div>
  );
}
