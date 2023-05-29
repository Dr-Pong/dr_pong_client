import React, { useState } from 'react';

import { ChatBoxProps } from 'types/chatTypes';

import ChatBox from 'components/chats/ChatBox';
import ChatInputBox from 'components/chats/ChatInputBox';

import styles from 'styles/chats/Chattings.module.scss';

export default function Chattings({ roomId }: { roomId: string }) {
  const [chatBoxes, setChatBoxes] = useState<ChatBoxProps[]>(chats);

  return (
    <div className={styles.chattings}>
      <div className={styles.chatBoxes}>
        {chatBoxes.map((c, i) => (
          <ChatBox key={i} chatBoxProp={c} />
        ))}
      </div>
      <ChatInputBox
        roomId={roomId as string}
        chatBoxes={chatBoxes}
        setChatBoxes={setChatBoxes}
      />
    </div>
  );
}

const chats = [
  {
    message: 'hakikim님이 나가셨습니다.',
  },
  {
    chatUser: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakikim',
    },
    message: '언뽈기븐~암어빌른~',
    time: new Date('2020-01-01T01:00:00'),
  },
  {
    chatUser: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakikim',
    },
    message: '언뽈기븐~암어빌른~',
    time: new Date('2020-01-01T00:30:01'),
  },
  {
    chatUser: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakikim',
    },
    message: '언뽈기븐~암어빌른~',
    time: new Date('2020-01-01T00:15:02'),
  },
  {
    chatUser: {
      imgUrl:
        'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
      nickname: 'hakikim',
    },
    message: '언뽈기븐~암어빌른~',
    time: new Date('2020-01-01T00:00:03'),
  },
];
