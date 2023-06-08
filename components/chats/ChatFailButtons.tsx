import React, { Dispatch, SetStateAction } from 'react';
import { IoIosClose, IoIosRefresh } from 'react-icons/io';

import { Chat } from 'types/chatTypes';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/chats/ChatFailButtons.module.scss';

type ChatFailButtonsProps = {
  id: number;
  message: string;
  setChats: Dispatch<SetStateAction<Chat[]>>;
  handleChatPost: (message: string) => void;
};

export default function ChatFailButtons({
  id,
  message,
  setChats,
  handleChatPost,
}: ChatFailButtonsProps) {
  const removeChatFromChats = () => {
    setChats((prev) => {
      return prev.filter((chat) => chat.id !== id);
    });
    id;
  };

  const handleChatDelete = () => {
    removeChatFromChats();
  };

  const handleChatResubmit = () => {
    removeChatFromChats();
    handleChatPost(message);
  };

  return (
    <div className={styles.chatFailButtonsContainer}>
      <BasicButton
        style={'square'}
        color={'white'}
        handleButtonClick={handleChatResubmit}
      >
        <IoIosRefresh />
      </BasicButton>
      <BasicButton
        style={'square'}
        color={'white'}
        handleButtonClick={handleChatDelete}
      >
        <IoIosClose />
      </BasicButton>
    </div>
  );
}
