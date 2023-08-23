import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react';

import { alertState } from 'recoils/alert';
import { openModalState } from 'recoils/modal';
import { sideBarState } from 'recoils/sideBar';

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
  setIsMuted: Dispatch<SetStateAction<boolean>>;
};

export default function Chattings({
  userImageMap,
  roomType,
  roomId,
  isMuted,
  setIsMuted,
}: ChattingsProps) {
  const { t } = useTranslation('channels');
  const router = useRouter();
  const setAlert = useSetRecoilState(alertState);
  const setModal = useSetRecoilState(openModalState);
  const setSideBar = useSetRecoilState(sideBarState);
  const [chats, setChats] = useState<Chat[]>([]);
  const [message, setMessage] = useState<string>('');
  const [showPreview, setShowPreview] = useState<boolean>(false);
  const [failedChatCount, setFailedChatCount] = useState<number>(0);
  const [newestChat, setNewestChat] = useState<Chat | null>(null);
  const [socket] = useChatSocket(roomType);
  const { queryClient, mutationPost } = useCustomQuery();
  const { chatsGet } = useChatQuery(roomType, roomId);
  const chattingsRef = useRef<HTMLDivElement | null>(null);
  const sendChatMutation = mutationPost(
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
        pageDown();
      },
    }
  );

  const handleChatJoin = useCallback((rawChats: Chat[]): void => {
    setChats((prev) => prev.concat(rawChats));
  }, []);

  const {
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    error,
  } = chatsGet(handleChatJoin, 20);

  const pageDown = useCallback(() => {
    const ref = chattingsRef.current!;
    ref.scrollTop = 0;
  }, [chattingsRef.current]);

  const newMessageListener = useCallback((data: Chat) => {
    setChats((prev) => [data, ...prev]);
    if (data.type === 'others') setNewestChat(data);
    if (data.type === 'me') pageDown();
  }, []);

  const newSystemMessageListener = useCallback((data: Chat) => {
    setChats((prev) => [data, ...prev]);
  }, []);

  const kickBanListener = useCallback((data: { type: 'kick' | 'ban' }) => {
    setAlert({
      type: 'warning',
      message: data.type === 'kick' ? t('kick') : t('ban'),
    });
    setModal(false);
    setSideBar(null);
    router.push('/channels');
  }, []);

  const muteListener = useCallback(() => {
    setIsMuted(true);
  }, []);

  const unmuteListener = useCallback(() => {
    setIsMuted(false);
  }, []);

  useEffect(() => {
    socket.on('message', newMessageListener);
    socket.on('system', newSystemMessageListener);
    socket.on('out', kickBanListener);
    socket.on('mute', muteListener);
    socket.on('unmute', unmuteListener);
    if (roomType === 'dm') {
      socket.emit('dear', { nickname: roomId });
    }
    return () => {
      socket.off('message', newMessageListener);
      socket.off('system', newSystemMessageListener);
      socket.off('out', kickBanListener);
      socket.off('mute', muteListener);
      socket.off('unmute', unmuteListener);
      queryClient.removeQueries(['chats', roomId]);
    };
  }, []);

  useEffect(() => {
    if (chattingsRef.current) {
      chattingsRef.current.addEventListener('scroll', handleScroll);
    }
    return () => {
      if (chattingsRef.current) {
        chattingsRef.current.removeEventListener('scroll', handleScroll);
      }
    };
  }, [hasNextPage, isFetchingNextPage]);

  const handlePreviewClick = useCallback(() => {
    setShowPreview(false);
    pageDown();
  }, []);

  const handleChatPost = useCallback((message: string) => {
    if (!isMessageValid(message)) return;
    sendChatMutation.mutate({ message });
    setMessage('');
  }, []);

  const handleScroll = () => {
    const ref = chattingsRef.current!;

    // 스크롤이 맨 위에 있는 경우
    if (
      hasNextPage &&
      !isFetchingNextPage &&
      Math.abs(ref.scrollTop) > ref.scrollHeight - ref.clientHeight - 100
    )
      fetchNextPage();

    // 스크롤이 맨 아래가 아닌 경우
    if (ref.scrollTop < -50) setShowPreview(true);

    // 스크롤미 맨 아래에 있는 경우
    if (ref.scrollTop > -10) {
      setShowPreview(false);
      setNewestChat(null);
    }
  };

  return (
    <div className={styles.chattingsContainer}>
      {isError ? (
        <ErrorRefresher error={error} />
      ) : isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className={styles.chattings} ref={chattingsRef}>
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
        </div>
      )}
      {showPreview && newestChat && (
        <div className={styles.preview} onClick={handlePreviewClick}>
          <div>{newestChat.nickname}</div>
          <div>{messageCutter(newestChat.message)}</div>
        </div>
      )}
      <ChatInputBox
        message={message}
        setMessage={setMessage}
        handleChatPost={handleChatPost}
        inputDisabled={isMuted}
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
