import { ChangeEvent, useCallback } from 'react';

import { SetChannelSettings } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function CapacityRadio({
  channel: newChannel,
  setChannel: setNewChannel,
}: SetChannelSettings) {
  const { capacity } = newChannel;

  const handleCapacityChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setNewChannel((prev) => ({
        ...prev,
        capacity: Number(event.target.value),
      }));
    },
    [newChannel]
  );

  return (
    <div className={styles.radioWrap}>
      <label className={styles.radio} htmlFor='10'>
        <input
          type='radio'
          id='10'
          value='10'
          checked={capacity === 10}
          onChange={handleCapacityChange}
        />
        10
      </label>
      <label className={styles.radio} htmlFor='30'>
        <input
          type='radio'
          id='30'
          value='30'
          checked={capacity === 30}
          onChange={handleCapacityChange}
        />
        30
      </label>
      <label className={styles.radio} htmlFor='50'>
        <input
          type='radio'
          id='50'
          value='50'
          checked={capacity === 50}
          onChange={handleCapacityChange}
        />
        50
      </label>
    </div>
  );
}
