import { useRouter } from 'next/router';

import { Channel } from 'types/channelTypes';

import styles from 'styles/channels/MyChannel.module.scss';

export default function MyChannel({ channel }: { channel: Channel }) {
  const router = useRouter();
  const { id, title, headCount, maxCount } = channel;

  const handleRouterToChat = () => {
    router.push(`/chats/channel/${id}`);
  };

  return (
    <div className={styles.myChannelContainer} onClick={handleRouterToChat}>
      <div>{title}</div>
      <div>
        {headCount} / {maxCount}
      </div>
    </div>
  );
}
