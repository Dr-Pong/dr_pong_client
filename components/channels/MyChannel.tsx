import { useRouter } from 'next/router';

import { EachChannel } from 'types/channelTypes';

import styles from 'styles/channels/MyChannel.module.scss';

export default function MyChannel({ channel }: { channel: EachChannel }) {
  const router = useRouter();

  const handleRouterToChat = () => {
    router.push(`/chats/channel/${channel.id}`);
  };

  return (
    <div
      className={styles.channelBox}
      onClick={handleRouterToChat}
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