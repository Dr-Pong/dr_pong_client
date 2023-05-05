import { useSetRecoilState } from 'recoil';

import React from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';

import { ModalParts } from 'types/modalTypes';
import { Achievement } from 'types/userTypes';

import UserImages from 'components/global/UserImages';
import CloseModalButton from 'components/global/buttons/CloseModalButton';
import ModalButton from 'components/global/buttons/ModalButton';
import ProfileButtons from 'components/global/buttons/buttonContainers/ProfileButtons';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ModalTitle from 'components/modals/modalParts/ModalTitle';
import Profile from 'components/myPage/profile/Profile';

import selectableItemStyles from 'styles/myPage/SelectableItem.module.scss';

const useModalProvider = () => {
  const setModalParts = useSetRecoilState(modalPartsState);
  const setOpenModal = useSetRecoilState(openModalState);
  const useModal = (parts: ModalParts) => {
    setModalParts(parts);
    setOpenModal(true);
  };
  const useProfileModal = (nickname: string) => {
    useModal({
      head: null,
      body: <Profile nickname={nickname} />,
      tail: <ProfileButtons target={nickname} />,
    });
  };

  const useEditWarningModal = (callback: () => void) => {
    useModal({
      head: null,
      body: <ModalPhrase>{'변경 사항 날라가는디 갠찬??..'}</ModalPhrase>,
      tail: (
        <div style={{ display: 'flex' }}>
          <ModalButton
            style={'basic'}
            color={'black'}
            handleButtonClick={callback}
          >
            {'갠찬'}
          </ModalButton>
          <CloseModalButton style={'basic'} color={'black'}>
            {'안갠찬..'}
          </CloseModalButton>
        </div>
      ),
    });
  };
  const useImageChangeModal = (callback: () => void, originId: number) => {
    useModal({
      head: null,
      body: <UserImages selectedId={originId} />,
      tail: (
        <div style={{ display: 'flex' }}>
          <ModalButton
            style={'basic'}
            color={'black'}
            handleButtonClick={callback}
          >
            {'바꾸'}
          </ModalButton>
          <CloseModalButton style={'basic'} color={'black'}>
            {'안바꾸..'}
          </CloseModalButton>
        </div>
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
        <CloseModalButton style={'basic'} color={'black'}>
          {'close'}
        </CloseModalButton>
      ),
    });
  };
  return {
    useProfileModal,
    useEditWarningModal,
    useImageChangeModal,
    useAchievementDetailModal,
  };
};

export default useModalProvider;
