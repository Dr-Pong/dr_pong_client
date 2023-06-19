import React, { useCallback, useEffect, useRef, useState } from 'react';
import { useQueryClient } from 'react-query';

import { Chat, RoomType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useChatSocket from 'hooks/useChatSocket';

import ChatBox from 'components/chats/ChatBox';
import ChatFailButtons from 'components/chats/ChatFailButtons';
import ChatInputBox from 'components/chats/ChatInputBox';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/chats/Chattings.module.scss';

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
  const queryClient = useQueryClient();
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>('');
  const [isTopRefVisible, setIsTopRefVisible] = useState(true);
  const [isBottomRefVisible, setIsBottomRefVisible] = useState(false);
  const [newestChat, setNewestChat] = useState<Chat | null>(null);
  const { chatsGet } = useChatQuery(roomType, roomId);
  const { mutate } = useChatQuery(roomType, roomId).postChatMutation();
  const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [socket, disconnectSocket] = useChatSocket(roomType);

  useEffect(() => {
    socket.connect();
    socket.on('message', (data: Chat) => {
      setChats((prev) => [{ ...data, id: prev[0].id + 1 }, ...prev]);
      setNewestChat({ ...data, id: chats[0]?.id });
    });

    return () => {
      socket.off('message');
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.target === topRef.current) {
            setIsTopRefVisible(entry.isIntersecting);
            setNewestChat(null);
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
      queryClient.removeQueries(['chats', roomId]);
    };
  }, []);

  const handleChatJoin = (rawChats: Chat[]): void => {
    setChats((prev) => prev.concat(rawChats));
  };

  const handlePreviewClick = useCallback(
    () => topRef.current?.scrollIntoView({ behavior: 'auto' }),
    [topRef.current]
  );

  const handleChatPostSuccess = (message: string) => {
    setChats((prev) => [
      {
        id: prev[0]?.id + 1,
        message,
        nickname: 'hakiim',
        time: new Date(),
        type: 'me',
      },
      ...prev,
    ]);
  };

  const handleChatPostFail = (message: string) => {
    setChats((prev) => [
      {
        id: prev[0]?.id + 1,
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
          onSuccess: () => handleChatPostSuccess(message),
          onError: (error: any) => {
            if (error.response.status == 400) return;
            handleChatPostFail(message);
          },
        }
      );
      setMessage('');
      topRef.current?.scrollIntoView({ behavior: 'auto' });
    },
    [message]
  );

  useEffect(() => {
    if (chats[0] !== newestChat) setNewestChat({ ...chats[0] });
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
          const { id, message, nickname } = chat;
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
              <ChatBox chat={chat} imgUrl={userImageMap[nickname]} />
            </div>
          );
        })}
        <div ref={bottomRef} className={styles.ref}>
          ㅤ
        </div>
      </div>
      {!isTopRefVisible && newestChat && chats[0].type === 'others' && (
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
