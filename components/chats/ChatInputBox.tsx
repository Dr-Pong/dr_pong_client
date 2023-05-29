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
}: {
  roomId: string;
  setChatBoxes: React.Dispatch<SetStateAction<ChatBoxProps[]>>;
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
            message,
            time: new Date(),
          },
          ...previous,
        ];
      });
      setMessage('');
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
