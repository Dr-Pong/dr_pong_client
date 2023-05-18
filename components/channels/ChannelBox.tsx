import { AllChannels } from 'types/channelTypes';

import styles from 'styles/channels/ChannelBox.module.scss';

export default function ChannelBox({ channel }: { channel: AllChannels | undefined }) {
  return (
    <div className={styles.channelList}>
      {channel?.channel.map(({ id, title, access, headCount, maxCount }: any) => {
        return (
          <div
            className={styles.channelBox}
            data-id={id}
            data-status={access}
            key={id}
            onClick={() => { }}
          >
            <div>
              {title.length > 20
                ? title.slice(0, 20) + "..."
                : title}
            </div>
            <div>{headCount} / {maxCount}</div>
          </div>
        );
      })}
    </div>
  );
}