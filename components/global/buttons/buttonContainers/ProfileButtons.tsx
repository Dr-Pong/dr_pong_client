import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React from 'react';

import { userState } from 'recoils/user';

import { ButtonDesign } from 'types/buttonTypes';

import useCustomQuery from 'hooks/useCustomQuery';
import useRelationButtons from 'hooks/useRelationButtons';

import styles from 'styles/global/Button.module.scss';

type ProfileButtonsProps = {
  target: string;
};

const buttonDesign: ButtonDesign = {
  style: 'flex',
  color: 'black',
};

export default function ProfileButtons({ target }: ProfileButtonsProps) {
  const {
    inviteGame,
    blockUser,
    unblockUser,
    addFriend,
    deleteFriend,
    directMessage,
  } = useRelationButtons(buttonDesign, target);
  const { t } = useTranslation('common');
  const { nickname } = useRecoilValue(userState);
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    '',
    `/users/${nickname}/relations/${target}`
  );

  const profileButtonList: {
    [key: string]: { style: string; buttons: React.ReactNode[] };
  } = {
    blocked: {
      style: 'buttonRowContainer',
      buttons: [unblockUser(t('unblock'))],
    },
    friend: {
      style: 'fourButtonsContainer',
      buttons: [
        inviteGame(t('invite to the game')),
        blockUser(t('block')),
        directMessage(t('message')),
        deleteFriend(t('delete friend')),
      ],
    },
    none: {
      style: 'buttonRowContainer',
      buttons: [blockUser(t('block')), addFriend(t('add friend'))],
    },
  };

  if (isLoading || isError) return null;
  if (!profileButtonList.hasOwnProperty(data.status)) return null;

  return (
    <div className={`${styles[profileButtonList[data.status].style]}`}>
      {profileButtonList[data.status].buttons.map((button, i) => {
        return <div key={i}>{button}</div>;
      })}
    </div>
  );
}
