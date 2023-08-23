import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import { Chat } from 'types/chatTypes';

import useModalProvider from 'hooks/useModalProvider';

import { timeConverter } from 'utils/timezoneResolver';

import styles from 'styles/chats/ChatBox.module.scss';

type ChatBoxProps = {
  chat: Chat;
  imgUrl: string;
};

function ChatBox({ chat, imgUrl }: ChatBoxProps) {
  const { t } = useTranslation('chats');
  const { message, nickname, time } = chat;
  const type = chat.type as string;
  const { useProfileModal } = useModalProvider();

  const handlerProfileClick = () => {
    if (!nickname) return;
    useProfileModal(nickname);
  };

  const meBox = () => {
    return (
      <div className={`${styles.meContainer} ${styles.messageTimeWrap}`}>
        <div className={styles.time}>{timeConverter(time)}</div>
        <div className={styles.message}>{message}</div>
      </div>
    );
  };

  const othersBox = () => {
    return (
      <div className={styles.othersContainer}>
        <div onClick={handlerProfileClick} className={styles.user}>
          <img
            className={styles.userImage}
            src={imgUrl ?? defaultImgUrl}
            alt='img'
          />
          <div>{nickname}</div>
        </div>
        <div className={styles.messageTimeWrap}>
          <div className={styles.message}>{message}</div>
          <div className={styles.time}>{timeConverter(time)}</div>
        </div>
      </div>
    );
  };

  const failBox = () => {
    return (
      <div className={styles.failContainer}>
        <div className={styles.message}>{message}</div>
      </div>
    );
  };

  const systemBox = () => {
    return (
      <div className={styles.systemContainer}>{`"${nickname}" ${t(
        message
      )}`}</div>
    );
  };

  const chatBoxes: { [key: string]: Function } = {
    me: meBox,
    others: othersBox,
    fail: failBox,
    system: systemBox,
  };

  return chatBoxes[type]();
}

export default React.memo(ChatBox);

const defaultImgUrl = '/image/ghost.png';
