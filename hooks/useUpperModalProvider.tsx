import useTranslation from 'next-translate/useTranslation';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { FormEvent, MutableRefObject } from 'react';

import { openUpperModalState, upperModalPartsState } from 'recoils/modal';

import { isInGame } from 'types/gameTypes';
import { ModalParts } from 'types/modalTypes';
import { Achievement } from 'types/userTypes';

import NumberInputBox from 'components/authentication/NumberInputBox';
import RegisterCode from 'components/authentication/RegisterCode';
import Loading from 'components/global/LoadingSpinner';
import SocketManager from 'components/global/SocketManager';
import BasicButton from 'components/global/buttons/BasicButton';
import SubmitButton from 'components/global/buttons/SubmitButton';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import UpperModalTitle from 'components/modals/upperModalParts/UpperModalTitle';

import selectableItemStyles from 'styles/myPage/SelectableItem.module.scss';

const useUpperModalProvider = () => {
  const { t } = useTranslation('common');
  const router = useRouter();
  const setOpenUpperModal = useSetRecoilState(openUpperModalState);
  const setUpperModalParts = useSetRecoilState(upperModalPartsState);
  const resetUpperModalParts = useResetRecoilState(upperModalPartsState);

  const useUpperModal = (parts: ModalParts) => {
    setUpperModalParts(parts);
    setOpenUpperModal(true);
  };

  const closeUpperModal = () => {
    resetUpperModalParts();
    setOpenUpperModal(false);
  };

  const useChannelJoinConfirmUpperModal = (handleChannelJoin: () => void) => {
    const handleConfirmModal = () => {
      closeUpperModal();
      handleChannelJoin();
    };

    useUpperModal({
      head: null,
      body: <ModalPhrase>{t('channel confirm')}</ModalPhrase>,
      tail: (
        <ButtonRow
          buttonList={[
            <BasicButton
              key={'close'}
              style='flex'
              color='purple'
              handleButtonClick={closeUpperModal}
            >
              {t('cancel')}
            </BasicButton>,
            <BasicButton
              key={'confirm'}
              style='flex'
              color='purple'
              handleButtonClick={handleConfirmModal}
            >
              {t('ok')}
            </BasicButton>,
          ]}
        />
      ),
    });
  };

  const useMatchWaitingUpperModal = (handleGameCancel: () => void) => {
    useUpperModal({
      head: (
        <>
          <SocketManager namespace='matching' />
          <UpperModalTitle title={t('Waiting For Match')} />
        </>
      ),
      body: <Loading useTimer={true} />,
      tail: (
        <BasicButton
          style='basic'
          color='pink'
          handleButtonClick={handleGameCancel}
        >
          {t('cancel')}
        </BasicButton>
      ),
    });
  };

  const useTfaRegisterModal = (
    inputRef: MutableRefObject<any>,
    handlePasswordSubmit: (e: FormEvent<HTMLFormElement>) => void
  ) => {
    useUpperModal({
      head: <UpperModalTitle title={t('Google OTP')} closeButton={true} />,
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

  const useAchievementDetailModal = (achievement: Achievement) => {
    const { name, imgUrl, content } = achievement;
    useUpperModal({
      head: <UpperModalTitle title={name} />,
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
        <BasicButton
          style='basic'
          color='purple'
          handleButtonClick={closeUpperModal}
        >
          {t('close')}
        </BasicButton>
      ),
    });
  };

  const useIsInGameModal = (roomData: isInGame) => {
    const handelBackToGame = () => {
      closeUpperModal();
      router.push(`/game/${roomData.roomType}/${roomData.roomId}`);
    };

    useUpperModal({
      head: null,
      body: <ModalPhrase>{t('inGameNotify')}</ModalPhrase>,
      tail: (
        <BasicButton
          style='long'
          color='purple'
          handleButtonClick={handelBackToGame}
        >
          {t('backToGame')}
        </BasicButton>
      ),
    });
  };

  const multiConnectWarningModal = (onLogout: () => void) => {
    const handleLogout = () => {
      closeUpperModal();
      onLogout();
    };

    useUpperModal({
      head: null,
      body: <ModalPhrase>{t('multiConnectWarning')}</ModalPhrase>,
      tail: (
        <BasicButton
          style='basic'
          color='purple'
          handleButtonClick={handleLogout}
        >
          {t('logout')}
        </BasicButton>
      ),
    });
  };

  return {
    closeUpperModal,
    useChannelJoinConfirmUpperModal,
    useMatchWaitingUpperModal,
    useTfaRegisterModal,
    useAchievementDetailModal,
    useIsInGameModal,
    multiConnectWarningModal,
  };
};

export default useUpperModalProvider;
