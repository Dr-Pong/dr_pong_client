import useTranslation from 'next-translate/useTranslation';

import { ChangeEvent, useCallback } from 'react';

import { SetChannelSettings } from 'components/channels/channelSettings/ChannelSettings';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function TypesRadio({
  channel: newChannel,
  setChannel: setNewChannel,
}: SetChannelSettings) {
  const { t } = useTranslation('channels');
  const { access } = newChannel;

  const handleTypeChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setNewChannel((prev) => ({
        ...prev,
        access: value,
        password: value === 'private' ? null : prev.password,
      }));
    },
    [newChannel]
  );

  return (
    <div className={styles.radioWrap}>
      <label className={styles.radio} htmlFor='public'>
        <input
          type='radio'
          id='public'
          name='type'
          value='public'
          checked={access === 'public'}
          onChange={handleTypeChange}
        />
        {t('public')}
      </label>
      <label className={styles.radio} htmlFor='private'>
        <input
          type='radio'
          id='private'
          name='type'
          value='private'
          checked={access === 'private'}
          onChange={handleTypeChange}
        />
        {t('private')}
      </label>
    </div>
  );
}
