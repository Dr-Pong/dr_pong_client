import { DirectMessage } from 'types/notificationTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import DirectMessageBox from 'components/directMessages/DirectMessageBox';

import styles from 'styles/directMessages/DirectMessages.module.scss';

export default function DirectMessages() {
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    ['friendChats'],
    '/users/friends/chats'
  );

  if (isLoading) return null;

  return (
    <div className={styles.directMessagesContainer}>
      {data.chats.map((chat: DirectMessage, i: number) => {
        return (
          <div key={i}>
            <DirectMessageBox directMessage={chat} />
          </div>
        );
      })}
    </div>
  );
}
