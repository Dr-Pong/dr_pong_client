import useTranslation from 'next-translate/useTranslation';

import React, { useEffect, useState } from 'react';

import { ChatList, DMRoom } from 'types/notificationTypes';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';

import DirectMessageBox from 'components/directMessages/DirectMessageBox';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/directMessages/DirectMessages.module.scss';

export default function DirectMessages() {
  const { t } = useTranslation('common');
  const [isEditable, setIsEditable] = useState<boolean>(false);
  const [{ chatList }, setChatList] = useState<ChatList>({ chatList: [] });
  const { get, queryClient } = useCustomQuery();
  const { isLoading, isError, error } = get(
    ['chatList'],
    '/users/friends/chatlist',
    setChatList
  );
  const [socket] = useChatSocket('global');

  useEffect(() => {
    const newChatListener = (nickname: string) => {
      if (!chatList.some((dmRoom: DMRoom) => dmRoom.nickname === nickname)) {
        queryClient.invalidateQueries(['chatList']);
        return;
      }
      setChatList((prev) => {
        return {
          chatList: prev.chatList.map((dmRoom: DMRoom) => {
            if (dmRoom.nickname === nickname)
              return { ...dmRoom, unread: dmRoom.newChats + 1 };
            return dmRoom;
          }),
        };
      });
    };
    socket.on('newChat', newChatListener);
    return () => {
      socket.off('newChat', newChatListener);
      queryClient.invalidateQueries('hasNewChat');
    };
  }, []);

  const handleEditClick = () => {
    setIsEditable(!isEditable);
  };

  return (
    <div className={styles.directMessagesContainer}>
      <BasicButton
        style='small'
        color='white'
        handleButtonClick={handleEditClick}
      >
        {isEditable ? t('ok') : t('edit')}
      </BasicButton>
      <div className={styles.directMessagesWrap}>
        {isError ? (
          <ErrorRefresher />
        ) : isLoading ? (
          <LoadingSpinner />
        ) : (
          chatList.map((dmRoom: DMRoom, i: number) => {
            return (
              <DirectMessageBox
                key={i}
                dmRoom={dmRoom}
                isEditable={isEditable}
              />
            );
          })
        )}
      </div>
    </div>
  );
}
