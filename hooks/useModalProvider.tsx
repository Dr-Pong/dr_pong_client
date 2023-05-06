import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import React from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';

import { ModalParts } from 'types/modalTypes';
import { Achievement } from 'types/userTypes';

import UserImages from 'components/global/UserImages';
import CloseModalButton from 'components/global/buttons/CloseModalButton';
import ModalButton from 'components/global/buttons/ModalButton';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import ProfileButtons from 'components/global/buttons/buttonContainers/ProfileButtons';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ModalTitle from 'components/modals/modalParts/ModalTitle';
import Profile from 'components/myPage/profile/Profile';

import selectableItemStyles from 'styles/myPage/SelectableItem.module.scss';

const useModalProvider = () => {
  const { t } = useTranslation('common');
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
  return {
    useProfileModal,
    useEditWarningModal,
    useImageChangeModal,
    useAchievementDetailModal,
  };
};

export default useModalProvider;