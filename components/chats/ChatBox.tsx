import React from 'react';

import { Chat, UserImageMap } from 'types/chatTypes';

import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/chats/ChatBox.module.scss';

type ChatBoxProps = {
  userImageMap: UserImageMap;
  chat: Chat;
};

function ChatBox({ userImageMap, chat }: ChatBoxProps) {
  const { message, nickname, time } = chat;
  const type = chat.type as string;
  const { useProfileModal } = useModalProvider();

  const imgClickHandler = () => {
    if (!nickname) return;
    useProfileModal(nickname);
  };

  const chatBoxes: { [key: string]: JSX.Element } = {
    me: (
      <div className={`${styles.meContainer} ${styles.messageTimeWrap}`}>
        <div className={styles.time}>{timeConverter(time)}</div>
        <div className={styles.message}>{message}</div>
      </div>
    ),
    others: (
      <div className={styles.othersContainer}>
        <div className={styles.user}>
          <img
            className={styles.userImage}
            onClick={imgClickHandler}
            src={userImageMap[nickname]}
            alt='img'
          />
          <div>{nickname}</div>
        </div>
        <div className={styles.messageTimeWrap}>
          <div className={styles.message}>{message}</div>
          <div className={styles.time}>{timeConverter(time)}</div>
        </div>
      </div>
    ),
    fail: (
      <div className={styles.failContainer}>
        <div className={styles.message}>{message}</div>
      </div>
    ),
    system: <div className={styles.systemContainer}>{message}</div>,
  };

  return chatBoxes[type];
}

export default React.memo(ChatBox);

function timeConverter(time: Date | undefined) {
  if (!time) return '';
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute < 10 ? '0' + minute : minute}`;
}
