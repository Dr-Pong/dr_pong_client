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
import QueueSpinner from 'components/global/QueueSpinner';
import SocketManager from 'components/global/SocketManager';
import BasicButton from 'components/global/buttons/BasicButton';
import SubmitButton from 'components/global/buttons/SubmitButton';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import UpperModalTitle from 'components/modals/upperModalParts/UpperModalTitle';
import AchievementModalPart from 'components/myPage/AchievementModalPart';

const useUpperModalProvider = () => {
  const { t: tCommon } = useTranslation('common');
  const { t: tAchievement } = useTranslation('achievement');
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
      body: <ModalPhrase>{tCommon('channel confirm')}</ModalPhrase>,
      tail: (
        <ButtonRow
          buttonList={[
            <BasicButton
              key={'close'}
              style='flex'
              color='purple'
              handleButtonClick={closeUpperModal}
            >
              {tCommon('cancel')}
            </BasicButton>,
            <BasicButton
              key={'confirm'}
              style='flex'
              color='purple'
              handleButtonClick={handleConfirmModal}
            >
              {tCommon('ok')}
            </BasicButton>,
          ]}
        />
      ),
    });
  };

  const useMatchWaitingUpperModal = (
    handleGameCancel: () => void,
    useTimer: boolean
  ) => {
    useUpperModal({
      head: (
        <>
          <SocketManager namespace='matching' />
          <UpperModalTitle title={tCommon('Waiting For Match')} />
        </>
      ),
      body: (
        <QueueSpinner useTimer={useTimer} handleGameCancel={handleGameCancel} />
      ),
      tail: (
        <BasicButton
          style='basic'
          color='pink'
          handleButtonClick={handleGameCancel}
        >
          {tCommon('cancel')}
        </BasicButton>
      ),
    });
  };

  const useTfaRegisterModal = (
    inputRef: MutableRefObject<any>,
    handlePasswordSubmit: (e: FormEvent<HTMLFormElement>) => void
  ) => {
    useUpperModal({
      head: (
        <UpperModalTitle title={tCommon('Google OTP')} closeButton={true} />
      ),
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
          {tCommon('authenticate')}
        </SubmitButton>
      ),
    });
  };

  const useAchievementDetailModal = (achievement: Achievement) => {
    useUpperModal({
      head: <UpperModalTitle title={`< ${tAchievement(achievement.name)} >`} />,
      body: <AchievementModalPart achievement={achievement} />,
      tail: (
        <BasicButton
          style='basic'
          color='purple'
          handleButtonClick={closeUpperModal}
        >
          {tCommon('close')}
        </BasicButton>
      ),
    });
  };

  const useIsInGameModal = (roomData: isInGame) => {
    const handelBackToGame = () => {
      closeUpperModal();
      router.push(`/game/${roomData.roomId}`);
    };

    useUpperModal({
      head: null,
      body: <ModalPhrase>{tCommon('inGameNotify')}</ModalPhrase>,
      tail: (
        <BasicButton
          style='long'
          color='purple'
          handleButtonClick={handelBackToGame}
        >
          {tCommon('backToGame')}
        </BasicButton>
      ),
    });
  };

  const multiConnectWarningModal = () => {
    const handleRouteToHome = () => {
      closeUpperModal();
      router.replace('/');
    };

    useUpperModal({
      head: null,
      body: <ModalPhrase>{tCommon('multiConnectWarning')}</ModalPhrase>,
      tail: (
        <BasicButton
          style='long'
          color='purple'
          handleButtonClick={handleRouteToHome}
        >
          {tCommon('GoToHome')}
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
