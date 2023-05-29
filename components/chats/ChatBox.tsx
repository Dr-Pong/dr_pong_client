import React from 'react';

import { ChatBoxProps, ChatBoxType } from 'types/chatTypes';

import styles from 'styles/chats/ChatBox.module.scss';

function ChatBox({ chatBoxProp }: { chatBoxProp: ChatBoxProps }) {
  const { chatUser, message, time } = chatBoxProp;
  const { imgUrl, nickname } = chatUser ?? {};

  const chatBox: { [key in ChatBoxType]: JSX.Element } = {
    chatBox: (
      <div className={styles.chatBox}>
        <img className={styles.chatterImg} src={imgUrl} />
        <div className={styles.chatTexts}>
          <div className={styles.nickname}>{nickname}</div>
          <div className={styles.messageBox}>
            <div className={styles.message}>{message}</div>
            <div className={styles.time}>{timeConverter(time)}</div>
          </div>
        </div>
      </div>
    ),
    myChatBox: (
      <div className={styles.myChatBox}>
        <div className={styles.myMessage}>{message}</div>
        <div className={styles.myTime}>{timeConverter(time)}</div>
      </div>
    ),
    systemChatBox: (
      <div className={styles.systemChatBox}>
        <div className={styles.systemMessage}>{message}</div>
      </div>
    ),
  };

  return chatBox[chatBoxTypeSelector(chatBoxProp)];
}

export default React.memo(ChatBox);

function chatBoxTypeSelector(props: ChatBoxProps) {
  if (props.chatUser) {
    return 'chatBox';
  }
  if (props.time) {
    return 'myChatBox';
  }
  return 'systemChatBox';
}

function timeConverter(time: Date | undefined) {
  if (!time) return '';
  const date = new Date(time);
  const hour = date.getHours();
  const minute = date.getMinutes();
  return `${hour}:${minute < 10 ? '0' + minute : minute}`;
}
