import React, { useEffect, useState } from "react";

import styles from '../../styles/chats/Chats.module.scss';
import { ParticipantsResponse, RoomType, UserImageMap } from "../../types/chatTypes";
import PageHeader from '../global/PageHeader';
import Chattings from './Chattings';
import { useSetRecoilState } from "recoil";
import { sideBarState } from "../../recoils/sideBar";
import useModalProvider from "../../hooks/useModalProvider";
import useCustomQuery from "../../hooks/useCustomQuery";
import useChatQuery from "../../hooks/useChatQuery";
import LoadingSpinner from "../global/LoadingSpinner";
import ErrorRefresher from "../global/ErrorRefresher";
import { RiLockPasswordFill } from "react-icons/ri";
import { BsPeopleFill } from "react-icons/bs";

export default function ChatsPageContainer({
  roomType,
  roomId,
}: {
  roomType: RoomType;
  roomId: string;
}) {
  const setSideBar = useSetRecoilState(sideBarState);
  const [userImageMap, setUserImageMap] = useState<UserImageMap>({});
  const { useChannelEditModal } = useModalProvider();
  const { get } = useCustomQuery();
  const myChannelGet = get('myChannel', '/channels/me');
  const { chatUsersGet } = useChatQuery(roomType, roomId);

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
