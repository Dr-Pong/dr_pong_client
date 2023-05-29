import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import React, { MutableRefObject, Dispatch, SetStateAction } from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';
import { userState } from 'recoils/user';

import { ModalParts } from 'types/modalTypes';
import { Achievement } from 'types/userTypes';

import NumberInputBox from 'components/authentication/NumberInputBox';
import RegisterCode from 'components/authentication/RegisterCode';
import SearchUser from 'components/friends/SearchUser';
import CreateChannel from 'components/channels/CreateChannel';
import ChannelPasswordInput from 'components/channels/ChannelPasswordInput';
import UserImages from 'components/global/UserImages';
import CloseModalButton from 'components/global/buttons/CloseModalButton';
import ModalButton from 'components/global/buttons/ModalButton';
import SubmitButton from 'components/global/buttons/SubmitButton';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import ProfileButtons from 'components/global/buttons/buttonContainers/ProfileButtons';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ModalTitle from 'components/modals/modalParts/ModalTitle';
import Profile from 'components/myPage/profile/Profile';
import Settings from 'components/settings/Settings';

import selectableItemStyles from 'styles/myPage/SelectableItem.module.scss';

const useModalProvider = () => {
  const { t } = useTranslation('common');
  const setModalParts = useSetRecoilState(modalPartsState);
  const resetModalParts = useResetRecoilState(modalPartsState);
  const setOpenModal = useSetRecoilState(openModalState);
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
    callback: () => void
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
        <SubmitButton style='basic' color='black' handleButtonClick={callback}>
          {t('authenticate')}
        </SubmitButton>
      ),
    });
  };

  const useProfileModal = (nickname: string) => {
    useModal({
      head: null,
      body: <Profile nickname={nickname} />,
      tail: user.roleType !== 'guest' && user.roleType !== 'noname' && (
        <ProfileButtons target={nickname} />
      ),
    });
  };

  const useEditWarningModal = (callback: () => void) => {
    useModal({
      head: null,
      body: <ModalPhrase>{'변경 사항 날라가는디 갠찬??..'}</ModalPhrase>,
      tail: (
        <ButtonRow
          buttonList={[
            <CloseModalButton style='flex' color='black'>
              {t('cancel')}
            </CloseModalButton>,
            <ModalButton
              style='flex'
              color='black'
              handleButtonClick={callback}
            >
              {t('Ok')}
            </ModalButton>,
          ]}
        />
      ),
    });
  };

  const useImageChangeModal = (callback: () => void, originId: number) => {
    useModal({
      head: null,
      body: <UserImages selectedId={originId} />,
      tail: (
        <ButtonRow
          buttonList={[
            <CloseModalButton style='flex' color='black'>
              {t('cancel')}
            </CloseModalButton>,
            <ModalButton
              style='flex'
              color='black'
              handleButtonClick={callback}
            >
              {t('Ok')}
            </ModalButton>,
          ]}
        />
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
        <CloseModalButton style='flex' color='black'>
          {t('close')}
        </CloseModalButton>
      ),
    });
  };

  const useFriendFinderModal = () => {
    useModal({
      head: <ModalTitle title={'Search User'} />,
      body: <SearchUser />,
      tail: null,
    });
  };

  const useCreateChannelModal = () => {
    useModal({
      head: <ModalTitle title={'Create New Channel'} closeButton />,
      body: <CreateChannel />,
      tail: null,
    });
  };

  const useChannelPasswordModal = (
    roomId: string
  ) => {
    useModal({
      head: <ModalTitle title={'Insert Channel Password'} closeButton />,
      body: <ChannelPasswordInput roomId={roomId} />,
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
    useFriendFinderModal,
    useCreateChannelModal,
    useChannelPasswordModal,
  };
};

export default useModalProvider;
