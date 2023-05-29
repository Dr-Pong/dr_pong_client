import { useRecoilValue } from 'recoil';

import React, { useState } from 'react';

import { userState } from 'recoils/user';

import {
  ChatBoxProps,
  ChattingType,
  RawChat,
  UserImageMap,
} from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';

import ChatBox from 'components/chats/ChatBox';
import ChatInputBox from 'components/chats/ChatInputBox';

import styles from 'styles/chats/Chattings.module.scss';

export default function Chattings({
  userImageMap,
  roomType,
  roomId,
}: {
  userImageMap: UserImageMap;
  roomType: ChattingType;
  roomId: string;
}) {
  const { nickname: myName } = useRecoilValue(userState);
  const [chatBoxes, setChatBoxes] = useState<ChatBoxProps[]>([]);
  const { getChats } = useChatQuery(roomType, roomId);

  const dataToChatBoxes = (rawChats: RawChat[]): void => {
    setChatBoxes(
      rawChats.map((c) => {
        const { message, nickname, createdAt } = c;
        if (nickname === myName) return { message, time: createdAt };
        else if (nickname === 'system') return { message };
        else
          return {
            chatUser: { nickname, imgUrl: userImageMap[nickname] },
            message,
            time: createdAt,
          };
      })
    );
  };

  const { data, isLoading, isError } = getChats(dataToChatBoxes);
  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className={styles.chattings}>
      <div className={styles.chatBoxes}>
        {chatBoxes.map((c, i) => (
          <ChatBox key={i} chatBoxProp={c} />
        ))}
      </div>
      <ChatInputBox roomId={roomId} setChatBoxes={setChatBoxes} />
    </div>
  );
}
