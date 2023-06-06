import useTranslation from 'next-translate/useTranslation';

import { ChangeEvent, useCallback } from 'react';

import { SetChannelSettings } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function PasswordInput({
  channel: newChannel,
  setChannel: setNewChannel,
}: SetChannelSettings) {
  const { t } = useTranslation('channels');
  const { password, access } = newChannel;

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const regex = /^[a-zA-Z0-9]+$/;
      if (value.length === 0 || (value.length <= 8 && regex.test(value))) {
        setNewChannel((prev) => ({
          ...prev,
          password: value,
        }));
      }
    },
    [newChannel]
  );

  return (
    <input
      className={styles.input}
      type='text'
      value={password ? password : ''}
      onChange={handlePasswordChange}
      placeholder={t('4~8 alphanumeric characters')}
      disabled={access === 'private'}
    />
  );
}
