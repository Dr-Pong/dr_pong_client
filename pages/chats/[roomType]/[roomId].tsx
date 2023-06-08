import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ReactElement, useEffect, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';

import { sideBarState } from 'recoils/sideBar';

import { RoomType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useModalProvider from 'hooks/useModalProvider';

import Chattings from 'components/chats/Chattings';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';

import styles from 'styles/chats/Chats.module.scss';

export default function Chats() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const setSideBar = useSetRecoilState(sideBarState);
  const [userImageMap, setUserImageMap] = useState<UserImageMap>({});
  const { useChannelEditModal } = useModalProvider();
  const { chatUsersGet } = useChatQuery(roomType as RoomType, roomId as string);

  useEffect(() => {
    if (roomType !== 'dm' && roomType !== 'channel') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
  }, []);

  const { data, isLoading, isError } = chatUsersGet(setUserImageMap);
  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  let buttons = [];
  const isOwner = data.me?.roleType === 'owner';

  if (roomType === 'channel') {
    if (isOwner)
      buttons.push({
        value: <RiLockPasswordFill />,
        handleButtonClick: () => {
          useChannelEditModal(roomId as string);
        },
      });
    buttons.push({
      value: <BsPeopleFill />,
      handleButtonClick: () => {
        setSideBar('participants');
      },
    });
  }

  return (
    <div className={styles.chatsPageContainer}>
      <PageHeader title={'chats'} buttons={buttons} />
      <Chattings
        userImageMap={userImageMap}
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
