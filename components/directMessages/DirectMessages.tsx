import { useState } from 'react';

import { ChatList, Friend } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import DirectMessageBox from 'components/directMessages/DirectMessageBox';

import styles from 'styles/directMessages/DirectMessages.module.scss';

export default function DirectMessages() {
  const [{ chatList }, setChatList] = useState<ChatList>({ chatList: [] });
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    ['chatList'],
    '/users/friends/chatlist',
    setChatList
  );

  if (isLoading) return null;

  return (
    <div className={styles.directMessagesContainer}>
      {chatList.map((friend: Friend, i: number) => {
        return <DirectMessageBox key={i} friend={friend} />;
      })}
    </div>
  );
}
