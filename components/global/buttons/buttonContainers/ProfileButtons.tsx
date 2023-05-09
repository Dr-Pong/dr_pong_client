import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React from 'react';

import { userState } from 'recoils/user';

import useCustomQuery from 'hooks/useCustomQuery';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/global/Button.module.scss';

import useRelationRequestQuery from '../../../../hooks/useRelationRequestQuery';

type ProfileButtonsProps = {
  target: string;
};

export default function ProfileButtons({ target }: ProfileButtonsProps) {
  const { t } = useTranslation('common');
  const user = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const {
    friendRequest,
    friendDeleteRequest,
    blockRequest,
    withdrawBlockRequest,
  } = useRelationRequestQuery();
  const { data, isLoading, isError } = get(
    '',
    `/users/{nickname}/relations/${target}`
  );

  const inviteUserToTheGame = () => {
    // Todo
  };

  const reportUser = () => {
    // Todo
  };

  const blockUser = () => {
    blockRequest(target);
  };

  const unblockUser = () => {
    withdrawBlockRequest(target);
  };

  const addFriend = () => {
    friendRequest(target);
  };

  const deleteFriend = () => {
    friendDeleteRequest(target);
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
    report: (
      <BasicButton style='flex' color='black' handleButtonClick={reportUser}>
        {t('report')}
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
  };

  const profileButtonList: {
    [key: string]: { style: string; buttons: string[] };
  } = {
    blocked: {
      style: 'buttonRowContainer',
      buttons: ['report', 'unblock'],
    },
    friend: {
      style: 'fourButtonsContainer',
      buttons: ['invite', 'report', 'block', 'delete'],
    },
    none: {
      style: 'fourButtonsContainer',
      buttons: ['invite', 'report', 'block', 'add'],
    },
  };

  if (isLoading) return null;
  if (
    !profileButtonList.hasOwnProperty(data.status) ||
    user.roleType === 'guest' ||
    user.roleType === 'noname'
  )
    return null;

  return (
    <div className={`${styles[profileButtonList[data.status].style]}`}>
      {profileButtonList[data.status].buttons.map((buttonName, i) => {
        return <div key={i}>{buttons[buttonName]}</div>;
      })}
    </div>
  );
}
