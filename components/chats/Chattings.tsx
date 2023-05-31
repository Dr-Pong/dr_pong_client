import { useRecoilValue } from 'recoil';

import React, { useCallback, useEffect, useRef, useState } from 'react';

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
  const topRef = useRef<HTMLDivElement>(null);
  const [isTopRefVisible, setIsTopRefVisible] = useState(true);
  // const [newestChat, setNewestChat] = useState<ChatBoxProps | null>(null);
  const [newestChat, setNewestChat] = useState<ChatBoxProps | null>({
    chatUser: { nickname: 'hakikim', imgUrl: userImageMap['hakikim'] },
    message: 'new message',
    time: new Date(),
  });

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => setIsTopRefVisible(entry.isIntersecting));
      },
      { threshold: 0.5 }
    );
    const timeout = setTimeout(() => {
      if (topRef.current) observer.observe(topRef.current);
    }, 100);

    return () => {
      clearTimeout(timeout);
      if (topRef.current) observer.unobserve(topRef.current);
    };
  }, []);

  const parseChats = (rawChats: RawChat[]): void => {
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

  useEffect(() => {
    if (!isTopRefVisible) setNewestChat(chatBoxes[0]);
    else topRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [chatBoxes]);

  const onNewestClick = useCallback(
    () => topRef.current?.scrollIntoView({ behavior: 'auto' }),
    [topRef.current]
  );

  const { data, isLoading, isError } = getChats(parseChats);
  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className={styles.chattings}>
      <div className={styles.chatBoxes}>
        <div ref={topRef} className={styles.top} />
        {chatBoxes.map((c, i) => (
          <ChatBox key={i} chatBoxProp={c} />
        ))}
      </div>
      {!isTopRefVisible && newestChat && (
        <div className={styles.preview} onClick={onNewestClick}>
          <ChatBox chatBoxProp={newestChat} />
        </div>
      )}
      <ChatInputBox
        roomId={roomId}
        setChatBoxes={setChatBoxes}
        topRef={topRef}
      />
    </div>
  );
}
