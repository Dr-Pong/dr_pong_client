import useTranslation from 'next-translate/useTranslation';

import {
  useResetRecoilState,
  useSetRecoilState
} from 'recoil';
import {
  upperModalPartsState,
  openUpperModalState
} from 'recoils/modal';

import { ModalParts } from 'types/modalTypes';

import ModalTitle from 'components/modals/modalParts/ModalTitle';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ButtonRow from 'components/global/buttons/buttonContainers/ButtonRow';
import Loading from 'components/global/LoadingSpinner';
import BasicButton from 'components/global/buttons/BasicButton';

const useUpperModalProvider = () => {
  const { t } = useTranslation('common');
  const setOpenUpperModal = useSetRecoilState(openUpperModalState);
  const setUpperModalParts = useSetRecoilState(upperModalPartsState);
  const resetUpperModalParts = useResetRecoilState(upperModalPartsState);

  const useUpperModal = (parts: ModalParts) => {
    setUpperModalParts(parts);
    setOpenUpperModal(true);
  }

  const closeUpperModal = () => {
    resetUpperModalParts();
    setOpenUpperModal(false);
  }


  const useChannelJoinConfirmUpperModal = (callback: () => void) => {
    const handleCallback = () => {
      closeUpperModal();
      callback();
    }

    useUpperModal({
      head: null,
      body: (
        <ModalPhrase>
          {t('channel confirm')}
        </ModalPhrase>
      ),
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
              handleButtonClick={handleCallback}
            >
              {t('Ok')}
            </BasicButton>,
          ]}
        />
      ),
    });
  };

  const useMatchWaitingUpperModal = (callback: () => void) => {
    useUpperModal({
      head: <ModalTitle title={t('Waiting For Match')} />,
      body: <Loading />,
      tail: (
        <BasicButton
          style='basic'
          color='pink'
          handleButtonClick={callback}
        >
          {t('cancel')}
        </BasicButton>
      ),
    });
  };

  return {
    closeUpperModal,
    useChannelJoinConfirmUpperModal,
    useMatchWaitingUpperModal,
  };
};

export default useUpperModalProvider;
