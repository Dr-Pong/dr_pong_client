import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React from 'react';

import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';
import useRelationRequestQuery from 'hooks/useRelationRequestQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/global/Button.module.scss';

type ProfileButtonsProps = {
  target: string;
};

export default function ProfileButtons({ target }: ProfileButtonsProps) {
  const { t } = useTranslation('common');
  const { nickname, roleType } = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const { friendRequest, breakupRequest, blockRequest, unblockRequest } =
    useRelationRequestQuery(target);
  const { data, isLoading, isError } = get(
    '',
    `/users/${nickname}/relations/${target}`
  );

  const inviteUserToTheGame = () => {
    // Todo
  };

  const blockUser = () => {
    blockRequest().mutate({});
  };

  const unblockUser = () => {
    unblockRequest().mutate();
  };

  const addFriend = () => {
    friendRequest().mutate({});
  };

  const deleteFriend = () => {
    breakupRequest().mutate();
  };

  const sendMessage = () => {
    // Todo
  };

  const buttons: { [key: string]: React.ReactNode } = {
    invite: (
      <BasicButton
        style='flex'
        color='black'
        handleButtonClick={inviteUserToTheGame}
      >
        {t('invite to the game')}
      </BasicButton>
    ),
    block: (
      <BasicButton style='flex' color='black' handleButtonClick={blockUser}>
        {t('block')}
      </BasicButton>
    ),
    unblock: (
      <BasicButton style='flex' color='black' handleButtonClick={unblockUser}>
        {t('unblock')}
      </BasicButton>
    ),
    add: (
      <BasicButton style='flex' color='black' handleButtonClick={addFriend}>
        {t('add friend')}
      </BasicButton>
    ),
    delete: (
      <BasicButton style='flex' color='black' handleButtonClick={deleteFriend}>
        {t('delete friend')}
      </BasicButton>
    ),
    message: (
      <BasicButton style='flex' color='black' handleButtonClick={sendMessage}>
        {t('message')}
      </BasicButton>
    ),
  };

  const profileButtonList: {
    [key: string]: { style: string; buttons: string[] };
  } = {
    blocked: {
      style: 'buttonRowContainer',
      buttons: ['unblock'],
    },
    friend: {
      style: 'fourButtonsContainer',
      buttons: ['invite', 'block', 'message', 'delete'],
    },
    none: {
      style: 'buttonRowContainer',
      buttons: ['block', 'add'],
    },
  };

  if (isLoading) return null;
  if (!profileButtonList.hasOwnProperty(data.status)) return null;

  return (
    <div className={`${styles[profileButtonList[data.status].style]}`}>
      {profileButtonList[data.status].buttons.map((buttonName, i) => {
        return <div key={i}>{buttons[buttonName]}</div>;
      })}
    </div>
  );
}
