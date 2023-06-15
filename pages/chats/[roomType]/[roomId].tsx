import { useRouter } from 'next/router';

import React, { ReactElement, useEffect } from 'react';

import { RoomType } from 'types/chatTypes';

import ChattingsFrame from 'components/chats/ChattingsFrame';
import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';

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
      <ChattingsFrame
        roomType={roomType as RoomType}
        roomId={roomId as string}
      />
    </div>
  );
}

Chats.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <AppLayout>{page}</AppLayout>
    </LoginFilter>
  );
};
