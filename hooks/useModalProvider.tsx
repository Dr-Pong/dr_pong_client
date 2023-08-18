import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import React from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';
import { userState } from 'recoils/user';

import { ModalParts } from 'types/modalTypes';

import PasswordSubmit from 'components/channels/PasswordSubmit';
import ChannelSettings from 'components/channels/channelSettings/ChannelSettings';
import SearchUser from 'components/friends/SearchUser';
import GameGuide from 'components/game/GameGuide';
import GameInvitableSelectMode from 'components/game/GameInvitationSelectMode';
import InvitationFrame from 'components/global/InvitationFrame';
import UserImages from 'components/global/UserImages';
import CloseModalButton from 'components/global/buttons/CloseModalButton';
import GoHomeCloseModalButton from 'components/global/buttons/GoHomeCloseModalButton';
import ModalButton from 'components/global/buttons/ModalButton';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ModalTitle from 'components/modals/modalParts/ModalTitle';
import Profile from 'components/myPage/profile/Profile';
import ProfileButtons from 'components/myPage/profile/ProfileButtons';
import Settings from 'components/settings/Settings';

const useModalProvider = () => {
  const { t } = useTranslation('common');
  const setOpenModal = useSetRecoilState(openModalState);
  const setModalParts = useSetRecoilState(modalPartsState);
  const resetModalParts = useResetRecoilState(modalPartsState);
  const user = useRecoilValue(userState);

  const useModal = (parts: ModalParts) => {
    setModalParts(parts);
    setOpenModal(true);
  };

  const closeModal = () => {
    resetModalParts();
    setOpenModal(false);
  };

  const useSettingsModal = () => {
    useModal({
      head: <ModalTitle title={t('settings')} />,
      body: <Settings />,
      tail: null,
    });
  };

  const useProfileModal = (nickname: string) => {
    useModal({
      head: null,
      body: <Profile nickname={nickname} style='modal' />,
      tail: user.roleType !== 'guest' && user.roleType !== 'noname' && (
        <ProfileButtons target={nickname} />
      ),
    });
  };

  const useEditWarningModal = (callback: () => void) => {
    useModal({
      head: null,
      body: <ModalPhrase>{t('lose changes?')}</ModalPhrase>,
      tail: (
        <ButtonRow
          buttonList={[
            <CloseModalButton key='close' style='flex' color='purple'>
              {t('cancel')}
            </CloseModalButton>,
            <ModalButton
              key='modal'
              style='flex'
              color='purple'
              handleButtonClick={callback}
            >
              {t('ok')}
            </ModalButton>,
          ]}
        />
      ),
    });
  };

  const useImageChangeModal = (
    handleImageSave: () => void,
    originId: number
  ) => {
    useModal({
      head: <ModalTitle title={t('Select image')} closeButton />,
      body: <UserImages selectedId={originId} />,
      tail: (
        <ModalButton
          style='long'
          color='purple'
          handleButtonClick={handleImageSave}
        >
          {t('ok')}
        </ModalButton>
      ),
    });
  };

  const useFriendRequestModal = () => {
    useModal({
      head: <ModalTitle title={t('Add friend')} />,
      body: <SearchUser />,
      tail: null,
    });
  };

  const useChannelCreateModal = (haveMyChannel: boolean) => {
    useModal({
      head: <ModalTitle title={t('Create new channel')} closeButton />,
      body: <ChannelSettings haveMyChannel={haveMyChannel} type='create' />,
      tail: null,
    });
  };

  const usePasswordSubmitModal = (roomId: string) => {
    useModal({
      head: <ModalTitle title={t('Password')} closeButton />,
      body: <PasswordSubmit roomId={roomId} />,
      tail: null,
    });
  };

  const useChannelEditModal = (roomId: string) => {
    useModal({
      head: <ModalTitle title={t('Edit channel')} closeButton />,
      body: <ChannelSettings roomId={roomId} type='edit' />,
      tail: null,
    });
  };

  const useLoginRequiredModal = () => {
    useModal({
      head: null,
      body: <ModalPhrase>{t('needLogin')}</ModalPhrase>,
      tail: (
        <GoHomeCloseModalButton style='long' color='purple'>
          {t('close')}
        </GoHomeCloseModalButton>
      ),
    });
  };

  const useChannelInvitationModal = (channelId: string) => {
    useModal({
      head: <ModalTitle title={t('Invite friend')} closeButton />,
      body: <InvitationFrame type='channel' channelId={channelId} />,
      tail: null,
    });
  };

  const useGameInvitationModal = (gameMode: string) => {
    useModal({
      head: <ModalTitle title={t('Invite friend')} closeButton />,
      body: <InvitationFrame type='game' gameMode={gameMode} />,
      tail: null,
    });
  };

  const useGameInstructionModal = () => {
    useModal({
      head: null,
      body: <GameGuide />,
      tail: null,
    });
  };

  const useSelectGameModeModal = (nickname: string) => {
    useModal({
      head: <ModalTitle title={t('gameMode')} closeButton />,
      body: <GameInvitableSelectMode target={nickname} />,
      tail: null,
    });
  };

  return {
    closeModal,
    useSettingsModal,
    useProfileModal,
    useEditWarningModal,
    useImageChangeModal,
    useFriendRequestModal,
    useChannelCreateModal,
    usePasswordSubmitModal,
    useChannelEditModal,
    useLoginRequiredModal,
    useChannelInvitationModal,
    useGameInvitationModal,
    useGameInstructionModal,
    useSelectGameModeModal,
  };
};

export default useModalProvider;
