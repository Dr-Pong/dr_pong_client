import React, {
  ChangeEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { IoIosClose, IoIosRefresh } from 'react-icons/io';
import { RiSendPlaneFill } from 'react-icons/ri';

import { ChatBoxProps, ChattingType } from 'types/chatTypes';

import useChatQuery from 'hooks/useChatQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/chats/ChatInputBox.module.scss';

export default function ChatInputBox({
  roomType,
  roomId,
  setChatBoxes,
  topRef,
}: {
  roomType: ChattingType;
  roomId: string;
  setChatBoxes: React.Dispatch<SetStateAction<ChatBoxProps[]>>;
  topRef: React.RefObject<HTMLDivElement>;
}) {
  const { mutate } = useChatQuery(roomType, roomId).chatMutationPost();
  const [message, setMessage] = useState<string>('');

  function onSuccess() {
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
  }

  function onErrorHandler(e: React.FormEvent | React.MouseEvent) {
    setChatBoxes((previous) => {
      const newId = previous[0].id + 1;
      const handleChatDelete = () => {
        setChatBoxes((previous) => {
          return previous.filter((chat) => chat.id !== newId);
        });
      };
      const handleChatRefresh = () => {
        setChatBoxes((previous) => {
          return previous.filter((chat) => chat.id !== newId);
        });
        handleChatSubmit(e);
      };
      const buttons = [
        <BasicButton
          key={'refresh'}
          style={'square'}
          color={'white'}
          handleButtonClick={handleChatRefresh}
        >
          <IoIosRefresh />
        </BasicButton>,
        <BasicButton
          key={'delete'}
          style={'square'}
          color={'white'}
          handleButtonClick={handleChatDelete}
        >
          <IoIosClose />
        </BasicButton>,
      ];
      return [
        {
          id: newId,
          message,
          buttons,
        },
        ...previous,
      ];
    });
  }

  const handleChatSubmit = useCallback(
    (e: React.FormEvent | React.MouseEvent) => {
      e.preventDefault();
      if (!isMessageValid(message)) return;
      mutate(
        { message },
        {
          onSuccess: () => onSuccess(),
          onError: () => onErrorHandler(e),
        }
      );
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
