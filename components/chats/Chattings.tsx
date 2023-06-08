import React, { useCallback, useEffect, useRef, useState } from 'react';

import { Chat, RoomType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';

import ChatBox from 'components/chats/ChatBox';
import ChatInputBox from 'components/chats/ChatInputBox';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/chats/Chattings.module.scss';

import ChatFailButtons from './ChatFailButtons';

type ChattingsProps = {
  userImageMap: UserImageMap;
  roomType: RoomType;
  roomId: string;
};

export default function Chattings({
  userImageMap,
  roomType,
  roomId,
}: ChattingsProps) {
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isTopRefVisible, setIsTopRefVisible] = useState(true);
  const [isBottomRefVisible, setIsBottomRefVisible] = useState(false);
  const [newestChat, setNewestChat] = useState<Chat | null>(null);
  const { chatsGet } = useChatQuery(roomType, roomId);
  const { mutate } = useChatQuery(roomType, roomId).postChatMutation();
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

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

  const handleChatJoin = (rawChats: Chat[]): void => {
    setChats((prev) => prev.concat(rawChats));
  };

  const handlePreviewClick = useCallback(
    () => topRef.current?.scrollIntoView({ behavior: 'auto' }),
    [topRef.current]
  );

  const handleChatPostFail = (message: string) => {
    setChats((prev) => [
      {
        id: prev[0].id + 1,
        message,
        nickname: '',
        time: new Date(),
        type: 'fail',
      },
      ...prev,
    ]);
  };

  const handleChatPost = useCallback(
    (message: string) => {
      if (!isMessageValid(message)) return;
      mutate(
        { message },
        {
          onSuccess: () => {},
          onError: () => handleChatPostFail(message),
        }
      );
      setMessage('');
      topRef.current?.scrollIntoView({ behavior: 'auto' });
    },
    [message]
  );

  useEffect(() => {
    if (
      !isTopRefVisible &&
      chats[0] !== newestChat &&
      chats[0].type === 'others'
    )
      // TODO: 소켓 달고
      setNewestChat({ ...chats[0] }); // TODO: 소켓 달고
    else if (chats[0] === newestChat) return; // TODO: 소켓 달고
    else topRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [chats]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = chatsGet(handleChatJoin, 20);

  useEffect(() => {
    if (hasNextPage && !isFetchingNextPage && isBottomRefVisible)
      fetchNextPage();
  }, [hasNextPage, fetchNextPage, isBottomRefVisible]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  return (
    <div className={styles.chattings}>
      <div className={styles.chatBoxes}>
        <div ref={topRef} className={styles.ref}>
          ㅤ
        </div>
        {chats.map((chat) => {
          const { id, message } = chat;
          return (
            <div key={chat.id} className={styles.chatBox}>
              {chat.type === 'fail' && (
                <ChatFailButtons
                  id={id}
                  message={message}
                  setChats={setChats}
                  handleChatPost={handleChatPost}
                />
              )}
              <ChatBox userImageMap={userImageMap} chat={chat} />
            </div>
          );
        })}
        <div ref={bottomRef} className={styles.ref}>
          ㅤ
        </div>
      </div>
      {!isTopRefVisible && newestChat && (
        <div className={styles.preview} onClick={handlePreviewClick}>
          <div>{newestChat.nickname}</div>
          <div>{messageCutter(newestChat.message)}</div>
        </div>
      )}
      <ChatInputBox
        message={message}
        setMessage={setMessage}
        handleChatPost={handleChatPost}
      />
    </div>
  );
}

function isMessageValid(message: string): boolean {
  return message.trim().length !== 0;
}

function messageCutter(message: string) {
  if (message.length > 10) return message.slice(0, 10) + '...';
  return message;
}
