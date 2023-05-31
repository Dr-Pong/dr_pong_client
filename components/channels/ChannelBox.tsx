import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import { EachChannel } from 'types/channelTypes';

import { IoIosLock } from "react-icons/io";

import styles from 'styles/channels/ChannelBox.module.scss';

export default function ChannelBox({ channel }: { channel: EachChannel }) {
  const router = useRouter();
  const { useChannelPasswordModal } = useModalProvider();
  const { mutationPost } = useCustomQuery();
  const { mutate } = mutationPost(`channels/${channel.id}/participants`);

  const handleRouterToChat = () => {
    mutate(
      { password: null },
      {
        onSuccess: () => {
          router.push(`/chats/channel/${channel.id}`);
        },
        onError: () => {
        },
      }
    );
  };

  const handleChannelJoin = useCallback(() => {
    if (channel.access === 'protected') {
      useChannelPasswordModal(channel.id.toString());
    } else {
      handleRouterToChat();
    }
  }, [handleRouterToChat, useChannelPasswordModal]);

  return (
    <div
      className={styles.channelBox}
      onClick={handleChannelJoin}
    >
      <div>
        {channel.title}
        {channel.access === 'protected' && (<IoIosLock className={styles.lockImg} />)}
      </div>
      <div>
        {channel.headCount} / {channel.maxCount}
      </div>
    </div>
  );
}