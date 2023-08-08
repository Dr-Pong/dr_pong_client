import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { useCallback, useEffect, useRef, useState } from 'react';

import { alertState } from 'recoils/alert';

import { Chat, RoomType, UserImageMap } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';
import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';

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
  isMuted: boolean;
};

export default function Chattings({
  userImageMap,
  roomType,
  roomId,
  isMuted,
}: ChattingsProps) {
  const { t } = useTranslation('channels');
  const router = useRouter();
  const setAlert = useSetRecoilState(alertState);
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>('');
  // const [isTopRefVisible, setIsTopRefVisible] = useState(false);
  // const [isBottomRefVisible, setIsBottomRefVisible] = useState(true);
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [inputDisabled, setInputDisabled] = useState(isMuted);
  const [failedChatCount, setFailedChatCount] = useState<number>(0);
  const [newestChat, setNewestChat] = useState<Chat | null>(null);
  // const topRef = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const [socket] = useChatSocket(roomType);
  const { queryClient, mutationPost } = useCustomQuery();
  const { chatsGet } = useChatQuery(roomType, roomId);
  const sendChatMutaion = mutationPost(
    roomType === 'dm'
      ? `/users/friends/${roomId}/chats`
      : `/channels/${roomId}/chats`,
    {
      onError: (e: AxiosError) => {
        if (e.status == 400) return;
        setChats((prev) => [
          {
            id: `fail_${failedChatCount}`,
            message,
            type: 'fail',
          },
          ...prev,
        ]);
        setFailedChatCount((prev) => prev + 1);
      },
    }
  );
  const messageRef = useRef<HTMLDivElement>(null);

  const newMessageListener = (data: Chat) => {
    // const ref = messageRef.current!;

    setChats((prev) => [data, ...prev]);
    if (data.type === 'others') setNewestChat(data);
    // if (!isBottomRefVisible && data.type === 'others') setShowPreview(true);
    // ref.scrollTop = ref.scrollHeight;
  };

  const newSystemMessageListener = (data: Chat) => {
    setChats((prev) => [data, ...prev]);
  };

  const kickBanListener = (data: { type: 'kick' | 'ban' }) => {
    setAlert({
      type: 'warning',
      message: data.type === 'kick' ? t('kick') : t('ban'),
    });
    router.push('/channels');
  };

  const muteListener = () => {
    setInputDisabled(true);
  };

  const unmuteListener = () => {
    setInputDisabled(false);
  };

  useEffect(() => {
    if (messageRef.current)
      messageRef.current!.addEventListener('scroll', handleScroll);
    socket.on('message', newMessageListener);
    socket.on('system', newSystemMessageListener);
    socket.on('out', kickBanListener);
    socket.on('mute', muteListener);
    socket.on('unmute', unmuteListener);
    if (roomType === 'dm') {
      socket.emit('dear', { nickname: roomId });
    }
    return () => {
      messageRef.current!.removeEventListener('scroll', handleScroll);
      socket.off('message', newMessageListener);
      socket.off('system', newSystemMessageListener);
      socket.off('out', kickBanListener);
      socket.off('mute', muteListener);
      socket.off('unmute', unmuteListener);
    };
  }, []);

  // useEffect(() => {
  //   const observer = new IntersectionObserver(
  //     (entries) => {
  //       entries.forEach((entry) => {
  //         if (entry.target === bottomRef.current) {
  //           setIsBottomRefVisible(entry.isIntersecting);
  //           setShowPreview(false);
  //         } else if (entry.target === topRef.current) {
  //           setIsTopRefVisible(entry.isIntersecting);
  //         }
  //       });
  //     },
  //     { threshold: 0.5 }
  //   );

  //   const timeout = setTimeout(() => {
  //     if (topRef.current) observer.observe(topRef.current);
  //     if (bottomRef.current) observer.observe(bottomRef.current);
  //   }, 300);

  //   return () => {
  //     clearTimeout(timeout);
  //     if (topRef.current) observer.unobserve(topRef.current);
  //     if (bottomRef.current) observer.unobserve(bottomRef.current);
  //     queryClient.removeQueries(['chats', roomId]);
  //   };
  // }, []);

  const handleChatJoin = (rawChats: Chat[]): void => {
    setChats((prev) => prev.concat(rawChats));
  };

  // const handlePreviewClick = useCallback(() => {
  //   bottomRef.current?.scrollIntoView({ behavior: 'auto' });
  //   setShowPreview(false);
  // }, [bottomRef.current]);

  const handlePreviewClick = useCallback(() => {
    const ref = messageRef.current!;

    setShowPreview(false);
    ref.scrollTop = ref.scrollHeight;
  }, [showPreview]);

  const handleChatPost = useCallback(
    (message: string) => {
      if (!isMessageValid(message)) return;
      const ref = messageRef.current!;

      sendChatMutaion.mutate({ message });
      setMessage('');
      ref.scrollTop = ref.scrollHeight;
    },
    [message]
  );

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = chatsGet(handleChatJoin, 20);

  let prevScrollHeight = 0;

  const handleScroll = () => {
    const ref = messageRef.current!;
    const scrollTop = ref.scrollTop;

    if (hasNextPage && !isFetchingNextPage && scrollTop === 0) {
      fetchNextPage();
      prevScrollHeight = ref.scrollHeight;
    }
    if (prevScrollHeight - scrollTop > ref.clientHeight + 1000)
      setShowPreview(true);
  };

  // useEffect(() => {
  //   if (hasNextPage && !isFetchingNextPage && isTopRefVisible) fetchNextPage();
  // }, [hasNextPage, fetchNextPage, isTopRefVisible]);

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher error={error} />;

  return (
    <div className={styles.chattingsContainer}>
      <div className={styles.chatRefWrap} ref={messageRef}>
        {/* <div ref={bottomRef} className={styles.ref}>
          ㅤ
        </div> */}
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
              <ChatBox
                chat={chat}
                imgUrl={nickname ? userImageMap[nickname] : ''}
              />
            </div>
          );
        })}
        {/* <div ref={topRef} className={styles.ref}>
          ㅤ
        </div> */}
      </div>
      {showPreview && newestChat && (
        <div className={styles.preview} onClick={handlePreviewClick}>
          <div>{chats[0].nickname}</div>
          <div>{messageCutter(chats[0].message)}</div>
        </div>
      )}
      <ChatInputBox
        message={message}
        setMessage={setMessage}
        handleChatPost={handleChatPost}
        inputDisabled={inputDisabled}
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
