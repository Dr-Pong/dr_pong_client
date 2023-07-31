import { AxiosError } from 'axios';
import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, {
  Dispatch,
  FormEvent,
  ReactElement,
  SetStateAction,
  useState,
} from 'react';

import { alertState } from 'recoils/alert';
import { openModalState, openUpperModalState } from 'recoils/modal';

import { ChannelInfo } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

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
  haveMyChannel?: boolean;
  roomId?: string;
  type: 'create' | 'edit';
};

type Error = {
  message: string;
};

type Response = {
  id: string;
};

export default function ChannelSettings({
  haveMyChannel,
  roomId,
  type,
}: ChannelSettingsProps) {
  const { t } = useTranslation('channels');
  const router = useRouter();
  const setOpenModal = useSetRecoilState(openModalState);
  const setAlert = useSetRecoilState(alertState);
  const setOpenUpperModal = useSetRecoilState(openUpperModalState);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(
    defaultChannelSettings
  );
  const { access, password } = channelInfo;
  const { useChannelJoinConfirmUpperModal } = useUpperModalProvider();
  const { mutationPost, mutationPatch } = useCustomQuery();
  const channelCreateMutation = mutationPost('/channels');
  const channelEditMutation = mutationPatch(`/channels/${roomId}`);

  const handleChannelCreate = () => {
    const trimmedTitle = channelInfo.title.trim();
    setChannelInfo((prev) => ({
      ...prev,
      title: trimmedTitle,
    }));
    channelCreateMutation.mutate({ ...channelInfo, title: trimmedTitle }, {
      onSuccess: (response: Response) => {
        setOpenUpperModal(false);
        setOpenModal(false);
        router.push(`/chats/channel/${response.id}`);
      },
      onError: (error: AxiosError<Error>) => {
        setAlert({
          type: 'failure',
          message: t(`${error.response?.data.message}`),
        });
      },
    } as object);
  };

  const handleChannelCreateCheck = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (channelInfo.title.trim()) {
      if (haveMyChannel) useChannelJoinConfirmUpperModal(handleChannelCreate);
      else handleChannelCreate();
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
      onSubmit: handleChannelCreateCheck,
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
