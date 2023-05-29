import EachChannelBox from 'components/channels/EachChannelBox';

import { AllChannels, EachChannel } from 'types/channelTypes';

import styles from 'styles/channels/ChannelBoxes.module.scss';

export default function ChannelBoxes({ channel }: { channel: AllChannels | undefined }) {
  return (
    <div className={styles.channelList}>
      {channel?.channel.map((eachChannel: EachChannel) => {
        return (
          <EachChannelBox channel={eachChannel} />
        );
      })}
    </div>
  );
}
