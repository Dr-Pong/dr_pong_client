import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import React, { FormEvent, useState } from 'react';

import { alertState } from 'recoils/alert';
import { openModalState } from 'recoils/modal';

import { ChannelInfo } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import { defaultChannelSettings } from 'components/channels/channelSettings/ChannelSettings';
import PasswordInput from 'components/channels/channelSettings/PasswordInput';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/ChannelSettings.module.scss';

type Error = {
  message: string;
};

export default function PasswordSubmit({ roomId }: { roomId: string }) {
  const { t } = useTranslation('channels');
  const router = useRouter();
  const setAlert = useSetRecoilState(alertState);
  const setOpenModal = useSetRecoilState(openModalState);
  const [channelInfo, setChannelInfo] = useState<ChannelInfo>(
    defaultChannelSettings
  );
  const { password } = channelInfo;
  const { mutationPost } = useCustomQuery();
  const { mutate } = mutationPost(`channels/${roomId}/participants`);

  const handlePasswordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!password) return;
    mutate(
      { password },
      {
        onSuccess: () => {
          router.push(`/chats/channel/${roomId}`);
          setOpenModal(false);
        },
        onError: (error: AxiosError<Error>) => {
          setAlert({ type: 'failure', message: t(`${error.response?.data.message}`) });
        },
      } as object
    );
  };

  return (
    <form className={styles.modalContainer} onSubmit={handlePasswordSubmit}>
      <PasswordInput
        channelInfo={channelInfo}
        setChannelInfo={setChannelInfo}
      />
      <BasicButton
        style='big'
        color='purple'
        handleButtonClick={handlePasswordSubmit}
      >
        {t('submit')}
      </BasicButton>
    </form>
  );
}
