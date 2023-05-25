import { Chat } from 'types/friendTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import MessageBox from 'components/messages/MessageBox';

import styles from 'styles/messages/Messages.module.scss';

export default function Messages() {
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    ['friendChats'],
    '/users/friends/chats'
  );

  if (isLoading) return null;

  return (
    <div className={styles.messagesContainer}>
      {data.chats.map((chat: Chat, i: number) => {
        return (
          <div key={i}>
            <MessageBox chat={chat} />
          </div>
        );
      })}
    </div>
  );
}
