import useTranslation from 'next-translate/useTranslation';

import { ChangeEvent, useCallback } from 'react';

import { SettingFieldProps } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function PasswordInput({
  channelInfo,
  setChannelInfo,
}: SettingFieldProps) {
  const { t } = useTranslation('channels');
  const { password, access } = channelInfo;

  const handlePasswordChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      const regex = /^[a-zA-Z0-9]+$/;
      if (value.length === 0 || (value.length <= 8 && regex.test(value))) {
        setChannelInfo((prev) => ({
          ...prev,
          password: value,
        }));
      }
    },
    [channelInfo]
  );

  return (
    <input
      className={styles.input}
      type='password'
      value={password ? password : ''}
      onChange={handlePasswordChange}
      placeholder={t('1~8 alphanumeric characters')}
      disabled={access === 'private'}
    />
  );
}
