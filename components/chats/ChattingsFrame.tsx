import { useSetRecoilState } from 'recoil';

import React, { useEffect, useState } from 'react';
import { BsPeopleFill } from 'react-icons/bs';
import { RiLockPasswordFill } from 'react-icons/ri';

import { sideBarState } from 'recoils/sideBar';

import { ParticipantsResponse, RoomType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import Chattings from 'components/chats/Chattings';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import PageHeader from 'components/global/PageHeader';

type ChattingsFrameProps = {
  roomType: RoomType;
  roomId: string;
};

export default function ChattingsFrame({
  roomType,
  roomId,
}: ChattingsFrameProps) {
  const setSideBar = useSetRecoilState(sideBarState);
  const [userImageMap, setUserImageMap] = useState<UserImageMap>({});
  const { useChannelEditModal } = useModalProvider();
  const { get, queryClient } = useCustomQuery();
  const myChannelGet = get('myChannel', '/channels/me');
  const { chatUsersGet } = useChatQuery(roomType as RoomType, roomId as string);
  const chatUsers = chatUsersGet(setUserImageMap);
  const [socket] = useChatSocket(roomType);

  useEffect(() => {
    const participantsListener = () => {
      queryClient.invalidateQueries('channelParticipants');
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

  if (chatUsers.isLoading || myChannelGet.isLoading) return <LoadingSpinner />;
  if (chatUsers.isError) return <ErrorRefresher error={chatUsers.error} />;
  if (myChannelGet.isError)
    return <ErrorRefresher error={myChannelGet.error} />;

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
