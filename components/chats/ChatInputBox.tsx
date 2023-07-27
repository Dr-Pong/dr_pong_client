import React, {
  ChangeEvent,
  Dispatch,
  SetStateAction,
  useCallback,
} from 'react';
import { RiSendPlaneFill } from 'react-icons/ri';

import styles from 'styles/chats/ChatInputBox.module.scss';

type ChatInputBoxProps = {
  message: string;
  setMessage: Dispatch<SetStateAction<string>>;
  handleChatPost: (message: string) => void;
  inputDisabled: boolean;
};

export default function ChatInputBox({
  message,
  setMessage,
  handleChatPost,
  inputDisabled,
}: ChatInputBoxProps) {
  const handleMessageChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      if (messageOverLengthLimit(event.target.value))
        event.target.value = event.target.value.substring(0, 100);
      setMessage(event.target.value);
    },
    [message]
  );

  const handleChatSubmit = useCallback(
    (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault();
      handleChatPost(message);
    },
    [message]
  );

  return (
    <form className={styles.chatInputBoxContainer} onSubmit={handleChatSubmit}>
      <input
        className={styles.input}
        type='text'
        value={message}
        onChange={handleMessageChange}
        disabled={inputDisabled}
      />
      <RiSendPlaneFill className={styles.sendIcon} onClick={handleChatSubmit} />
    </form>
  );
}

const messageOverLengthLimit = (message: string): boolean => {
  return message.length > 100;
};
