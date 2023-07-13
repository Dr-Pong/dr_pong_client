import useTranslation from 'next-translate/useTranslation';
import { useResetRecoilState, useSetRecoilState } from 'recoil';

import React, { FormEvent, MutableRefObject } from 'react';

import { openUpperModalState, upperModalPartsState } from 'recoils/modal';

import { ModalParts } from 'types/modalTypes';

import NumberInputBox from 'components/authentication/NumberInputBox';
import RegisterCode from 'components/authentication/RegisterCode';
import Loading from 'components/global/LoadingSpinner';
import BasicButton from 'components/global/buttons/BasicButton';
import SubmitButton from 'components/global/buttons/SubmitButton';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import UpperModalTitle from "components/modals/upperModalParts/UpperModalTitle";
import SocketManager from 'components/global/SocketManager';

const useUpperModalProvider = () => {
  const { t } = useTranslation('common');
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
              style='flex'
              color='purple'
              handleButtonClick={closeUpperModal}
            >
              {t('cancel')}
            </BasicButton>,
            <BasicButton
              style='flex'
              color='purple'
              handleButtonClick={handleConfirmModal}
            >
              {t('Ok')}
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
      body: <Loading />,
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

  return {
    closeUpperModal,
    useChannelJoinConfirmUpperModal,
    useMatchWaitingUpperModal,
    useTfaRegisterModal,
  };
};

export default useUpperModalProvider;
