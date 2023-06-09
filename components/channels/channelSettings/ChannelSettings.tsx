import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { FormEvent, SetStateAction, useState, Dispatch } from 'react';

import { openModalState } from 'recoils/modal';

import { ChannelInfo } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import CapacityRadio from 'components/channels/channelSettings/CapacityRadio';
import PasswordInput from 'components/channels/channelSettings/PasswordInput';
import TitleInput from 'components/channels/channelSettings/TitleInput';
import TypesRadio from 'components/channels/channelSettings/TypesRadio';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/ChannelSettings.module.scss';

export type SettingFieldProps = {
  channelInfo: ChannelInfo;
  setChannelInfo: Dispatch<SetStateAction<ChannelInfo>>;
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
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(
    defaultChannelSettings
  );
  const { access, password } = channelInfo;
  const { mutationPost, mutationPatch } = useCustomQuery();
  const channelCreateMutation = mutationPost('/channels');
  const channelEditMutation = mutationPatch(`/channels/${roomId}`);

  const handleChannelCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (channelInfo.title) {
      channelCreateMutation.mutate({ newChannel: channelInfo });
      setOpenModal(false);
    }
  };

  const handleChannelEdit = () => {
    if (access === 'protected' && (password === null || password === ''))
      return;
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
        <TypesRadio channelInfo={channelInfo} setChannelInfo={setChannelInfo} />
      ),
    },
    title: {
      label: t('Title'),
      input: (
        <TitleInput channelInfo={channelInfo} setChannelInfo={setChannelInfo} />
      ),
    },
    password: {
      label: t('Password'),
      input: (
        <PasswordInput
          channelInfo={channelInfo}
          setChannelInfo={setChannelInfo}
        />
      ),
    },
    capacity: {
      label: t('Capacity'),
      input: (
        <CapacityRadio
          channelInfo={channelInfo}
          setChannelInfo={setChannelInfo}
        />
      ),
    },
  };

  const types = {
    create: {
      fields: ['type', 'title', 'password', 'capacity'],
      buttonValue: 'create',
      onSubmit: handleChannelCreate,
    },
    edit: {
      fields: ['type', 'password'],
      buttonValue: 'save',
      onSubmit: handleChannelEdit,
    },
  };

  return (
    <div className={styles.modalContainer}>
      <div className={styles.settingFields}>
        {types[type].fields.map((field, i) => {
          const { label, input } = settingFields[field];
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
  maxCount: 10,
};
