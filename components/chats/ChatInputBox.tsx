import { useRecoilValue } from 'recoil';

import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

import { userState } from 'recoils/user';

import { ChatBoxProps } from 'types/chatTypes';

import styles from 'styles/chats/ChatInputBox.module.scss';

export default function ChatInputBox({
  roomId,
  chatBoxes,
  setChatBoxes,
}: {
  roomId: string;
  chatBoxes: ChatBoxProps[];
  setChatBoxes: React.Dispatch<SetStateAction<ChatBoxProps[]>>;
}) {
  const me = useRecoilValue(userState);
  const [message, setMessage] = useState<string>('');
  const handleChatSubmit = useCallback(
    (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault();
      if (!message) return;
      //mutate;
      setChatBoxes([
        {
          message: message,
          time: new Date(),
        },
        ...chatBoxes,
      ]);
      setMessage('');
    },
    [message]
  );

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setMessage(event.target.value);
    },
    [message]
  );

  return (
    <form className={styles.channelSearch} onSubmit={handleChatSubmit}>
      <input
        className={styles.input}
        type='text'
        value={message}
        onChange={handleMessageChange}
        placeholder=''
      />
      <RiSendPlaneFill className={styles.sendIcon} onClick={handleChatSubmit} />
    </form>
  );
}
