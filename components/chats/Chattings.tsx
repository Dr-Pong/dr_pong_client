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
  const { chatsGet } = useChatQuery(roomType, roomId);
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [isTopRefVisible, setIsTopRefVisible] = useState(true);
  const [isBottomRefVisible, setIsBottomRefVisible] = useState(false);
  const [newestChat, setNewestChat] = useState<ChatBoxProps | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === topRef.current) {
            setIsTopRefVisible(entry.isIntersecting);
          } else if (entry.target === bottomRef.current) {
            setIsBottomRefVisible(entry.isIntersecting);
          }
        });
      },
      { threshold: 0.5 }
    );

    const timeout = setTimeout(() => {
      if (topRef.current) observer.observe(topRef.current);
      if (bottomRef.current) observer.observe(bottomRef.current);
    }, 300);

    return () => {
      clearTimeout(timeout);
      if (topRef.current) observer.unobserve(topRef.current);
      if (bottomRef.current) observer.unobserve(bottomRef.current);
    };
  }, []);

  const rawChatToChatBoxProps = useCallback(
    (rawChat: RawChat): ChatBoxProps => {
      const { id, message, nickname, createdAt } = rawChat;
      if (nickname === myName) return { id, message, time: createdAt };
      else if (nickname === 'system') return { id, message };
      else
        return {
          id,
          chatUser: { nickname, imgUrl: userImageMap[nickname] },
          message,
          time: createdAt,
        };
    },
    [myName, userImageMap]
  );

  const parseChats = (rawChats: RawChat[]): void => {
    setChatBoxes((prev) => {
      return [...prev, ...rawChats.map((c) => rawChatToChatBoxProps(c))];
    });
  };

  useEffect(() => {
    if (!isTopRefVisible && chatBoxes[0] !== newestChat) // TODO: 소켓 달고
      setNewestChat(chatBoxes[0]); // TODO: 소켓 달고
    else if (chatBoxes[0] === newestChat) return; // TODO: 소켓 달고
    else topRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [chatBoxes]);

  const onNewestClick = useCallback(
    () => topRef.current?.scrollIntoView({ behavior: 'auto' }),
    [topRef.current]
  );

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = chatsGet(parseChats);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && isBottomRefVisible)
      fetchNextPage();
  }, [hasNextPage, fetchNextPage, isBottomRefVisible]);

  if (isLoading) return null;
  if (isError) return null;

  return (
    <div className={styles.chattings}>
      <div className={styles.chatBoxes}>
        <div ref={topRef} className={styles.top}>
          ㅤ
        </div>
        {chatBoxes.map((c) => (
          <ChatBox key={c.id} chatBoxProp={c} />
        ))}
        <div ref={bottomRef} className={styles.bottom}>
          ㅤ
        </div>
      </div>
      {!isTopRefVisible && newestChat && (
        <div className={styles.preview} onClick={onNewestClick}>
          <ChatBox chatBoxProp={newestChat} />
        </div>
      )}
      <ChatInputBox
        roomType={roomType}
        roomId={roomId}
        setChatBoxes={setChatBoxes}
        topRef={topRef}
      />
    </div>
  );
}
