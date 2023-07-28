import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import { AxiosError } from 'axios';

import React, { useCallback } from 'react';
import { IoIosLock } from 'react-icons/io';

import { alertState } from 'recoils/alert';
import { loginState } from 'recoils/login';

import { Channel } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';
import useUpperModalProvider from 'hooks/useUpperModalProvider';

import styles from 'styles/channels/ChannelBox.module.scss';

type Error = {
  message: string;
};

export default function ChannelBox({
  channel,
  isMyChannel,
  haveMyChannel,
}: {
  channel: Channel;
  isMyChannel: boolean;
  haveMyChannel: boolean;
}) {
  const { t } = useTranslation('channels');
  const { id, title, access, headCount, maxCount } = channel;
  const router = useRouter();
  const login = useRecoilValue(loginState);
  const { useLoginRequiredModal, usePasswordSubmitModal } = useModalProvider();
  const { useChannelJoinConfirmUpperModal } = useUpperModalProvider();
  const setAlert = useSetRecoilState(alertState);
  const { mutationPost } = useCustomQuery();
  const { mutate } = mutationPost(`channels/${id}/participants`);

  const handleRouterToChat = () => {
    mutate(
      { password: null },
      {
        onSuccess: () => {
          router.push(`/chats/channel/${id}`);
        },
        onError: (error: AxiosError<Error>) => {
          setAlert({ type: 'failure', message: t(`${error.response?.data.message}`) });
        },
      } as object
    );
  };

  const handleJoinConfirm = useCallback(() => {
    if (!login) useLoginRequiredModal();
    else if (haveMyChannel && !isMyChannel)
      useChannelJoinConfirmUpperModal(handleChannelJoin);
    else handleChannelJoin();
  }, []);

  const handleChannelJoin = useCallback(() => {
    if (access === 'protected' && !isMyChannel) {
      usePasswordSubmitModal(id.toString());
    } else {
      handleRouterToChat();
    }
  }, [handleRouterToChat, usePasswordSubmitModal]);

  return (
    <div className={styles.channelBoxContainer} onClick={handleJoinConfirm}>
      <div>
        {title}
        {access === 'protected' && <IoIosLock className={styles.lockEmoji} />}
      </div>
      <div>
        {headCount} / {maxCount}
      </div>
    </div>
  );
}
