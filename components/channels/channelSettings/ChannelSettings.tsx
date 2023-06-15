import { useRouter } from 'next/router';

import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import {
  FormEvent,
  SetStateAction,
  useState,
  Dispatch,
  ReactElement
} from 'react';

import { alertTypeState, openAlertState } from 'recoils/alert';
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
  input: ReactElement;
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
  const router = useRouter();
  const setOpenModal = useSetRecoilState(openModalState);
  const setOpenAlert = useSetRecoilState(openAlertState);
  const setAlertType = useSetRecoilState(alertTypeState);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(
    defaultChannelSettings
  );
  const { access, password } = channelInfo;
  const { mutationPost, mutationPatch } = useCustomQuery();
  const channelCreateMutation = mutationPost('/channels');
  const channelEditMutation = mutationPatch(`/channels/${roomId}`);

  const handleChannelCreate = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedTitle = channelInfo.title.trim();
    setChannelInfo((prev) => ({
      ...prev,
      title: trimmedTitle,
    }));
    if (trimmedTitle) {
      channelCreateMutation.mutate(
        { ...channelInfo, title: trimmedTitle },
        {
          onSuccess: (response: any) => {
            setOpenModal(false);
            router.push(`/chats/channel/${response.id}`);
          },
          onError: (e: any) => {
            setAlertType('fail');
            setOpenAlert(true);
            // Alert에 e.response.data.message를 띄워주는 것이 좋을 것 같다
          },
        }
      );
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
