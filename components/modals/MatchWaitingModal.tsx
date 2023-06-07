import useTranslation from 'next-translate/useTranslation';

import { createPortal } from 'react-dom';

import { useRecoilState } from 'recoil';
import { matchWaitingModalState } from 'recoils/modal';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/modals/MatchWaitingModal.module.scss';

export default function MatchWaitingModal() {
  const { t } = useTranslation('game');
  const [showWaitingModal, setShowWaitingModal]
    = useRecoilState(matchWaitingModalState);

  const handleMatchingCancel = () => {
    setShowWaitingModal(false);
  }

  if (!showWaitingModal) return null;

  return createPortal(
    <div className={styles.modalBackdrop}>
      <div
        className={styles.modalContainer}
        onClick={(e) => { e.stopPropagation(); }}
      >
        <div className={styles.modalTitle}>
          {t('Waiting For Match')}
        </div>
        <div className={styles.loadingContainer}>
          <div className={styles.loadingSpinner} />
          <BasicButton
            style='basic'
            color='pink'
            handleButtonClick={handleMatchingCancel}
          >
            {t('cancel')}
          </BasicButton>
        </div>
      </div>
    </div >,
    document.getElementById('matchWaitingModalRoot') as HTMLElement
  );
}
