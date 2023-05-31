import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

import { ChatBoxProps } from 'types/chatTypes';

import styles from 'styles/chats/ChatInputBox.module.scss';

export default function ChatInputBox({
  roomId,
  setChatBoxes,
  topRef,
}: {
  roomId: string;
  setChatBoxes: React.Dispatch<SetStateAction<ChatBoxProps[]>>;
  topRef: React.RefObject<HTMLDivElement>;
}) {
  const [message, setMessage] = useState<string>('');

  const handleChatSubmit = useCallback(
    (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault();
      if (!isMessageValid(message)) return;
      //mutate;
      setChatBoxes((previous) => {
        return [
          {
            id: previous[0].id + 1,
            message,
            time: new Date(),
          },
          ...previous,
        ];
      });
      setMessage('');
      topRef.current?.scrollIntoView({ behavior: 'auto' });
    },
    [message]
  );

  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (messageOverLengthLimit(event.target.value))
        event.target.value = event.target.value.substring(0, 100);
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

const messageOverLengthLimit = (message: string): boolean => {
  return message.length > 100;
};

const isMessageValid = (message: string): boolean => {
  return message.trim().length !== 0;
};
