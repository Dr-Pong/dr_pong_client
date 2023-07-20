import { useRouter } from 'next/router';

import React, { ReactElement, useEffect } from 'react';

import { RoomType } from 'types/chatTypes';

import ChattingsFrame from 'components/chats/ChattingsFrame';
import SocketManager from 'components/global/SocketManager';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/chats/Chats.module.scss';

export default function Chats() {
  const router = useRouter();
  const { roomType, roomId } = router.query;

  useEffect(() => {
    if (roomType !== 'dm' && roomType !== 'channel') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
  }, []);

  return (
    <div className={styles.chatsPageContainer}>
      <SocketManager key={roomId as string} namespace={roomType as RoomType} />
      <ChattingsFrame
        key={'room' + (roomId as string)}
        roomType={roomType as RoomType}
        roomId={roomId as string}
      />
    </div>
  );
}

Chats.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
