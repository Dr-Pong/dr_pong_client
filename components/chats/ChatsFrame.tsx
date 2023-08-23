import { useSetRecoilState } from 'recoil';

import React, { useEffect, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';

import { sideBarState } from 'recoils/sideBar';

import { Participant, RoomType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import Chattings from 'components/chats/Chattings';
import PageHeader from 'components/global/PageHeader';

type ChatsFrameProps = {
  roomType: RoomType;
  roomId: string;
};

export default function ChatsFrame({ roomType, roomId }: ChatsFrameProps) {
  const setSideBar = useSetRecoilState(sideBarState);
  const [userImageMap, setUserImageMap] = useState<UserImageMap>({});
  const [me, setMe] = useState<Participant>();
  const { useChannelEditModal } = useModalProvider();
  const { queryClient } = useCustomQuery();
  const { chatUsersGet, myChannelGet } = useChatQuery(roomType, roomId);
  const [socket] = useChatSocket(roomType);

  useEffect(() => {
    const participantsListener = () => {
      queryClient.invalidateQueries(['channelParticipants']);
      queryClient.invalidateQueries(['participants']);
    };
    socket.on('participants', participantsListener);
    return () => {
      socket.off('participants', participantsListener);
    };
  }, []);

  const headerTitles: { [key: string]: string } = {
    channel: `${myChannelGet.data?.myChannel?.title}`,
    dm: `${roomId}`,
  };

  const { data } = chatUsersGet(setUserImageMap);

  useEffect(() => {
    if (data) {
      setMe(data.me);
    }
  }, [data]);

  const buttons = [];

  if (roomType === 'channel') {
    if (me?.roleType === 'owner')
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
    <>
      <PageHeader title={headerTitles[roomType as string]} buttons={buttons} />
      <Chattings
        userImageMap={userImageMap}
        roomType={roomType as RoomType}
        roomId={roomId as string}
        isMuted={me?.isMuted ?? false}
      />
    </>
  );
}
