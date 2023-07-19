import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import { useRouter } from 'next/router';

import React, { ReactNode } from 'react';

import { userState } from 'recoils/user';

import { ButtonDesign } from 'types/buttonTypes';

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
  const { get } = useCustomQuery();
  const { closeModal } = useModalProvider();
  const router = useRouter();
  const { data, isLoading, isError } = get(
    '',
    `/users/${nickname}/relations/${target}`
  );

  const buttons: { [key: string]: ReactNode } = {
    myPage: (
      <BasicButton
        style='flex'
        color='purple'
        handleButtonClick={() => {
          closeModal();
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
          router.push(`/chats/dm/${target}`);
        }}
      >
        {t('message')}
      </BasicButton>
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
    friend: ['directMessage', 'friendDelete', 'blockUser'],
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
