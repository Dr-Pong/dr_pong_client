import useTranslation from 'next-translate/useTranslation';

import { ChangeEvent, useCallback } from 'react';

import { SetChannelSettings } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function TitleInput({
  channel: newChannel,
  setChannel: setNewChannel,
}: SetChannelSettings) {
  const { t } = useTranslation('channels');
  const { title } = newChannel;

  const handleTitleChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      if (value.length <= 16) {
        setNewChannel((prevChannel) => ({
          ...prevChannel,
          title: value,
        }));
      }
    },
    [newChannel]
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
