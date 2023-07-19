import useTranslation from 'next-translate/useTranslation';

import React, { ChangeEvent, useCallback } from 'react';

import { SettingFieldProps } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function TypesRadio({
  channelInfo,
  setChannelInfo,
}: SettingFieldProps) {
  const { t } = useTranslation('channels');
  const { access } = channelInfo;
  const channelTypes = ['public', 'private'];

  const handleTypeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setChannelInfo((prev) => ({
        ...prev,
        access: value,
        password: value === 'private' ? null : prev.password,
      }));
    },
    [channelInfo]
  );

  return (
    <div className={styles.radioWrap}>
      {channelTypes.map((type, i) => {
        return (
          <label key={i} className={styles.radio} htmlFor={type}>
            <input
              type='radio'
              id={type}
              name='type'
              value={type}
              checked={access === type}
              onChange={handleTypeChange}
            />
            {t(type)}
          </label>
        );
      })}
    </div>
  );
}
