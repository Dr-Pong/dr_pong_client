import { useRouter } from 'next/router';

import { useCallback } from 'react';
import { IoIosLock } from 'react-icons/io';

import { Channel } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/channels/ChannelBox.module.scss';

export default function ChannelBox({
  channel,
  isMyChannel
}: {
  channel: Channel,
  isMyChannel: boolean
}) {
  const { id, title, access, headCount, maxCount } = channel;
  const router = useRouter();
  const { usePasswordSubmitModal } = useModalProvider();
  const { mutationPost } = useCustomQuery();
  const { mutate } = mutationPost(`channels/${id}/participants`);

  const handleRouterToChat = () => {
    mutate(
      { password: null },
      {
        onSuccess: () => {
          router.push(`/chats/channel/${id}`);
        },
        onError: () => { },
      }
    );
  };

  const handleChannelJoin = useCallback(() => {
    if (access === 'protected' && !isMyChannel) {
      usePasswordSubmitModal(id.toString());
    } else {
      handleRouterToChat();
    }
  }, [handleRouterToChat, usePasswordSubmitModal]);

  return (
    <div className={styles.channelBoxContainer} onClick={handleChannelJoin}>
      <div>
        {title}
        {access === 'protected' && <IoIosLock className={styles.lockEmoji} />}
      </div>
      <div>
        {headCount} / {maxCount}
      </div>
    </div>
  );
}
