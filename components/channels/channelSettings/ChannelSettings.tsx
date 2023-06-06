import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { FormEvent, SetStateAction, useState } from 'react';

import { openModalState } from 'recoils/modal';

import { ChannelInfo } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import CapacityRadio from 'components/channels/channelSettings/CapacityRadio';
import PasswordInput from 'components/channels/channelSettings/PasswordInput';
import TitleInput from 'components/channels/channelSettings/TitleInput';
import TypesRadio from 'components/channels/channelSettings/TypesRadio';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/ChannelSettings.module.scss';

export type SetChannelSettings = {
  channel: ChannelInfo;
  setChannel: React.Dispatch<SetStateAction<ChannelInfo>>;
};

type FieldType = {
  label: string;
  input: React.ReactElement;
};

type ChannelSettingsProps = {
  roomId?: string;
  type: 'create' | 'edit';
};

export default function ChannelSettings({
  roomId,
  type,
}: ChannelSettingsProps) {
  const { t } = useTranslation('channels');
  const setOpenModal = useSetRecoilState(openModalState);
  const [channelSettings, setChannelSettings] = useState<ChannelInfo>(
    defaultChannelSettings
  );
  const { access, password } = channelSettings;
  const { mutationPost, mutationPatch } = useCustomQuery();
  const channelCreateMutation = mutationPost('/channels');
  const channelEditMutation = mutationPatch(`/channels/${roomId}`);

  const handleCreateChannel = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (channelSettings.title) {
      channelCreateMutation.mutate({ newChannel: channelSettings });
      setOpenModal(false);
    }
  };

  const handleEditChannel = () => {
    if (access === 'protected' && (password === null || password === ''))
      return null;
    channelEditMutation.mutate(
      { access, password },
      {
        onSuccess: () => {
          setOpenModal(false);
        },
      }
    );
  };

  const settingFields: { [key: string]: FieldType } = {
    type: {
      label: t('Type'),
      input: (
        <TypesRadio channel={channelSettings} setChannel={setChannelSettings} />
      ),
    },
    title: {
      label: t('Title'),
      input: (
        <TitleInput channel={channelSettings} setChannel={setChannelSettings} />
      ),
    },
    password: {
      label: t('Password'),
      input: (
        <PasswordInput
          channel={channelSettings}
          setChannel={setChannelSettings}
        />
      ),
    },
    capacity: {
      label: t('Capacity'),
      input: (
        <CapacityRadio
          channel={channelSettings}
          setChannel={setChannelSettings}
        />
      ),
    },
  };

  const types = {
    create: {
      fields: ['type', 'title', 'password', 'capacity'],
      buttonValue: 'create',
      onSubmit: handleCreateChannel,
    },
    edit: {
      fields: ['type', 'password'],
      buttonValue: 'save',
      onSubmit: handleEditChannel,
    },
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.settingFields}>
        {types[type].fields.map((field, i) => {
          const { label, input }: FieldType = settingFields[field];
          return (
            <div key={i} className={styles.settingField}>
              <div className={styles.fieldName}>{label}</div>
              {input}
            </div>
          );
        })}
      </div>
      <BasicButton
        style='big'
        color='purple'
        handleButtonClick={types[type].onSubmit}
      >
        {t(types[type].buttonValue)}
      </BasicButton>
    </div>
  );
}

export const defaultChannelSettings: ChannelInfo = {
  access: 'public',
  title: '',
  password: null,
  capacity: 10,
};
