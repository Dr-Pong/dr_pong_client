import { useRouter } from 'next/router';

import React, { ReactElement, useEffect, useState } from 'react';
import { RiSettings4Fill } from 'react-icons/ri';
import { IoIosMenu } from 'react-icons/io'

import { useSetRecoilState } from 'recoil';
import { sideBarState } from 'recoils/sideBar';

import { ChattingType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';

import Chattings from 'components/chats/Chattings';
import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';

import styles from 'styles/chats/Chats.module.scss';

export default function Chats() {
  const router = useRouter();
  const { roomType, roomId } = router.query;
  const setSideBar = useSetRecoilState(sideBarState);
  const [userImageMap, setUserImageMap] = useState<UserImageMap>({});

  const { chatUsersGet } = useChatQuery(
    roomType as ChattingType,
    roomId as string
  );

  useEffect(() => {
    if (roomType !== 'dm' && roomType !== 'channel') router.replace('404');
    if (typeof roomId !== 'string') router.replace('/');
  }, []);

  const { data, isLoading, isError } = chatUsersGet(setUserImageMap);
  if (isLoading) return null;
  if (isError) return null;

  let button;
  if (roomType === 'channel')
    button = { value: <RiSettings4Fill />, handleButtonClick: () => { setSideBar('participants'); } };

  return (
    <div className={styles.chats}>
      <PageHeader title={'chats'} button={button} />
      <Chattings
        userImageMap={userImageMap}
        roomType={roomType as ChattingType}
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
