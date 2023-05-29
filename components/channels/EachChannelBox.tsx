import { useCallback } from 'react';

import { useRouter } from 'next/router';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import { EachChannel } from 'types/channelTypes';

import styles from 'styles/channels/ChannelBoxes.module.scss';

export default function EachChannelBox({ channel }: { channel: EachChannel }) {
  const router = useRouter();
  const { useSubmitChannelPasswordModal } = useModalProvider();
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

  const onClickJoinChannel = useCallback(() => {
    if (channel.access === 'protected') {
      useSubmitChannelPasswordModal(channel.id.toString());
    } else {
      handleRouterToChat();
    }
  }, [handleRouterToChat, useSubmitChannelPasswordModal]);

  return (
    <div
      className={styles.channelBox}
      onClick={onClickJoinChannel}
    >
      <div>
        {channel.title}
      </div>
      <div>
        {channel.headCount} / {channel.maxCount}
      </div>
    </div>
  );
}