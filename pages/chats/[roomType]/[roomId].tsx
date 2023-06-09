import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ReactElement, useEffect, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';

import { sideBarState } from 'recoils/sideBar';

import { ParticipantsResponse, RoomType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useCustomQuery from 'hooks/useCustomQuery';
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
  const { get } = useCustomQuery();
  const myChannelGet = get('myChannel', '/channels/me');
  const { chatUsersGet } = useChatQuery(roomType as RoomType, roomId as string);

  useEffect(() => {
    if (roomType !== 'dm' && roomType !== 'channel') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
  }, []);

  const chatUsers = chatUsersGet(setUserImageMap);

  if (chatUsers.isLoading || myChannelGet.isLoading) return <LoadingSpinner />;
  if (chatUsers.isError || myChannelGet.isError) return <ErrorRefresher />;

  const buttons = [];
  const { me } = chatUsers.data as ParticipantsResponse;

  if (roomType === 'channel') {
    if (me.roleType === 'owner')
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

  const headerTitles: { [key: string]: string } = {
    channel: `${myChannelGet.data?.myChannel?.title}`,
    dm: `${roomId}`,
  };

  return (
    <div className={styles.chatsPageContainer}>
      <PageHeader title={headerTitles[roomType as string]} buttons={buttons} />
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
