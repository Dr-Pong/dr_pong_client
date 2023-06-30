import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import React, { MutableRefObject } from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';
import { userState } from 'recoils/user';

import { Participant } from 'types/chatTypes';
import { ModalParts } from 'types/modalTypes';
import { InvitationType } from 'types/notificationTypes';
import { Achievement } from 'types/userTypes';

import NumberInputBox from 'components/authentication/NumberInputBox';
import RegisterCode from 'components/authentication/RegisterCode';
import PasswordSubmit from 'components/channels/PasswordSubmit';
import ChannelSettings from 'components/channels/channelSettings/ChannelSettings';
import SearchUser from 'components/friends/SearchUser';
import InvitationRequest from 'components/global/InvitationRequest';
import SocketManager from 'components/global/SocketManager';
import UserImages from 'components/global/UserImages';
import CloseModalButton from 'components/global/buttons/CloseModalButton';
import ModalButton from 'components/global/buttons/ModalButton';
import SubmitButton from 'components/global/buttons/SubmitButton';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ModalTitle from 'components/modals/modalParts/ModalTitle';
import Profile from 'components/myPage/profile/Profile';
import ProfileButtons from 'components/myPage/profile/ProfileButtons';
import Settings from 'components/settings/Settings';

import selectableItemStyles from 'styles/myPage/SelectableItem.module.scss';

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

  const useTfaRegisterModal = (
    inputRef: MutableRefObject<any>,
    handlePasswordSubmit: () => void
  ) => {
    useModal({
      head: <ModalTitle title={t('Google OTP')} />,
      body: (
        <div>
          <RegisterCode />
          <NumberInputBox inputRef={inputRef} boxNumber={6} />
        </div>
      ),
      tail: (
        <SubmitButton
          style='long'
          color='purple'
          handleButtonClick={handlePasswordSubmit}
        >
          {t('authenticate')}
        </SubmitButton>
      ),
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
            <CloseModalButton style='flex' color='purple'>
              {t('cancel')}
            </CloseModalButton>,
            <ModalButton
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

  const useAchievementDetailModal = (achievement: Achievement) => {
    const { name, imgUrl, content } = achievement;
    useModal({
      head: <ModalTitle title={name} />,
      body: (
        <ModalPhrase>
          {
            <div>
              <img
                className={selectableItemStyles.itemImage}
                src={imgUrl}
                alt={name}
              />
              <div>{content}</div>
            </div>
          }
        </ModalPhrase>
      ),
      tail: (
        <CloseModalButton style='long' color='purple'>
          {t('close')}
        </CloseModalButton>
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

  const useInvitationModal = (
    invitationType: InvitationType,
    invitationArg: string,
    participants?: Participant[]
  ) => {
    useModal({
      head: <ModalTitle title={t('Invite friend')} closeButton />,
      body: (
        <>
          <SocketManager namespace={'friends'} />
          <InvitationRequest
            invitationType={invitationType}
            invitationArg={invitationArg}
            participants={participants}
          />
        </>
      ),
      tail: null,
    });
  };

  return {
    closeModal,
    useSettingsModal,
    useTfaRegisterModal,
    useProfileModal,
    useEditWarningModal,
    useImageChangeModal,
    useAchievementDetailModal,
    useFriendRequestModal,
    useChannelCreateModal,
    usePasswordSubmitModal,
    useChannelEditModal,
    useInvitationModal,
  };
};

export default useModalProvider;
