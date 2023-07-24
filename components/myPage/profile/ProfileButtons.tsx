import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { ReactNode, useState, useEffect } from 'react';

import { userState } from 'recoils/user';
import { sideBarState } from 'recoils/sideBar';

import { Statuses } from 'types/friendTypes';
import { ButtonDesign } from 'types/buttonTypes';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';
import useModalProvider from 'hooks/useModalProvider';

import RelationButton from 'components/friends/RelationButton';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/global/Button.module.scss';

type ProfileButtonsProps = {
  target: string;
};

const button: ButtonDesign = {
  style: 'flex',
  color: 'purple',
};

export default function ProfileButtons({ target }: ProfileButtonsProps) {
  const { t } = useTranslation('common');
  const { nickname } = useRecoilValue(userState);
  const setSideBar = useSetRecoilState(sideBarState);
  const { get } = useCustomQuery();
  const { closeModal, useSelectGameModeModal } = useModalProvider();
  const router = useRouter();
  const { data, isLoading, isError } = get(
    '',
    `/users/${nickname}/relations/${target}`
  );
  const [statuses, setStatuses] = useState<Statuses>({});
  const [chatSocket] = useChatSocket('friends');

  useEffect(() => {
    const friendStatusListener = (newStatuses: Statuses) => {
      setStatuses((prev) => {
        return {
          ...prev,
          ...newStatuses,
        };
      });
    };
    chatSocket.on('friends', friendStatusListener);
    chatSocket.emit('status');
    return () => {
      chatSocket.off('friends', friendStatusListener);
    };
  }, []);

  const buttons: { [key: string]: ReactNode } = {
    myPage: (
      <BasicButton
        style='flex'
        color='purple'
        handleButtonClick={() => {
          closeModal();
          setSideBar(null);
          router.push('/myPage');
        }}
      >
        {t('move to my page')}
      </BasicButton>
    ),
    directMessage: (
      <BasicButton
        style='flex'
        color='purple'
        handleButtonClick={() => {
          closeModal();
          setSideBar(null);
          router.push(`/chats/dm/${target}`);
        }}
      >
        {t('message')}
      </BasicButton>
    ),
    inviteGame: (
      statuses[target] === 'online' ? (
        <BasicButton
          style='flex'
          color='purple'
          handleButtonClick={() => {
            closeModal();
            setSideBar(null);
            useSelectGameModeModal(target);
          }}
        >
          {t('inviteGame')}
        </BasicButton>
      ) : null
    ),
    blockUser: (
      <RelationButton button={button} type='block' target={target}>
        {t('block')}
      </RelationButton>
    ),
    unblockUser: (
      <RelationButton button={button} type='unblock' target={target}>
        {t('unblock')}
      </RelationButton>
    ),
    friendAdd: (
      <RelationButton button={button} type='friendAdd' target={target}>
        {t('add friend')}
      </RelationButton>
    ),
    friendDelete: (
      <RelationButton button={button} type='friendDelete' target={target}>
        {t('delete friend')}
      </RelationButton>
    ),
  };

  const relationStatuses: { [key: string]: string[] } = {
    none: ['friendAdd', 'blockUser'],
    friend: ['inviteGame', 'directMessage', 'friendDelete', 'blockUser'],
    blocked: ['unblockUser'],
    me: ['myPage'],
  };

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;
  if (!Object.prototype.hasOwnProperty.call(data, 'status')) return null;

  return (
    <div className={styles.profileButtonsContainer}>
      {relationStatuses[data.status].map((buttonName, i) => {
        return <div key={i}>{buttons[buttonName]}</div>;
      })}
    </div>
  );
}
