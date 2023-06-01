import { useRouter } from 'next/router';

import { IsMyChannel } from 'types/channelTypes';

import styles from 'styles/channels/ChannelBox.module.scss';

export default function MyChannel({ channel }: { channel: IsMyChannel }) {
  const router = useRouter();

  const handleRouterToChat = () => {
    router.push(`/chats/channel/${channel?.id}`);
  };

  return (
    <div
      className={styles.channelBox}
      onClick={handleRouterToChat}
    >
      <div>
        {channel?.title}
      </div>
      <div>
        {channel?.headCount} / {channel?.maxCount}
      </div>
    </div>
  );
}