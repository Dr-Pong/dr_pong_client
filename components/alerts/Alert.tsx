import useTranslation from 'next-translate/useTranslation';
import { useRecoilState, useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { alertTypeState, openAlertState } from 'recoils/alert';

import styles from 'styles/alerts/Alert.module.scss';

export default function Alert() {
  const { t } = useTranslation('common');
  const [openAlert, setOpenAlert] = useRecoilState(openAlertState);
  const alertType = useRecoilValue(alertTypeState);
  const alertMessages: { [key: string]: string } = {
    fail: t('failure'),
    success: t('success'),
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      if (openAlert) setOpenAlert(false);
    }, 500);
    return () => {
      clearTimeout(timer);
    };
  }, [openAlert]);

  const handleBackdropClick = () => {
    setOpenAlert(false);
  };

  if (openAlert)
    return createPortal(
      <div className={styles.alertBackdrop} onClick={handleBackdropClick}>
        <div className={styles.alertContainer}>{alertMessages[alertType]}</div>
      </div>,
      document.getElementById('alertRoot') as HTMLElement
    );
  return null;
}
