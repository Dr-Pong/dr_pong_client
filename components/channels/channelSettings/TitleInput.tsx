import useTranslation from 'next-translate/useTranslation';

import { ChangeEvent, useCallback } from 'react';

import { SettingFieldProps } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function TitleInput({
  channelInfo,
  setChannelInfo,
}: SettingFieldProps) {
  const { t } = useTranslation('channels');
  const { title } = channelInfo;

  const handleTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value.length <= 16) {
        setChannelInfo((prev) => ({
          ...prev,
          title: value,
        }));
      }
    },
    [channelInfo]
  );

  return (
    <input
      className={styles.input}
      type='text'
      value={title}
      onChange={handleTitleChange}
      placeholder={t('1~16 characters')}
    />
  );
}
