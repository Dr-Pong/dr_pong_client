import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { FormEvent, useState } from 'react';

import { alertTypeState, openAlertState } from 'recoils/alert';
import { openModalState } from 'recoils/modal';

import { ChannelInfo } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import { defaultChannelSettings } from 'components/channels/channelSettings/ChannelSettings';
import PasswordInput from 'components/channels/channelSettings/PasswordInput';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/channels/ChannelSettings.module.scss';

export default function PasswordSubmit({ roomId }: { roomId: string }) {
  const { t } = useTranslation('channels');
  const router = useRouter();
  const setOpenAlert = useSetRecoilState(openAlertState);
  const setAlertType = useSetRecoilState(alertTypeState);
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
        onError: (e: any) => {
          setAlertType('fail');
          setOpenAlert(true);
          // Alert에 e.response.data.message를 띄워주는 것이 좋을 것 같다
        },
      }
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
