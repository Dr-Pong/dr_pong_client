import { ChangeEvent, useCallback } from 'react';

import { SettingFieldProps } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function CapacityRadio({
  channelInfo,
  setChannelInfo,
}: SettingFieldProps) {
  const { maxCount } = channelInfo;
  const capacities = [10, 30, 50];

  const handleCapacityChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setChannelInfo((prev) => ({
        ...prev,
        maxCount: Number(event.target.value),
      }));
    },
    [channelInfo]
  );

  return (
    <div className={styles.radioWrap}>
      {capacities.map((number, i) => {
        return (
          <label key={i} className={styles.radio} htmlFor={`${number}`}>
            <input
              type='radio'
              id={`${number}`}
              value={`${number}`}
              checked={maxCount === number}
              onChange={handleCapacityChange}
            />
            {number}
          </label>
        );
      })}
    </div>
  );
}
