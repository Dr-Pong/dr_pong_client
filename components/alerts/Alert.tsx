import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';

import { alertState } from 'recoils/alert';

import styles from 'styles/alerts/Alert.module.scss';

export type AlertType = {
  type: 'success' | 'failure';
  message?: string;
} | null;

export default function Alert() {
  const { t } = useTranslation('common');
  const [alert, setAlert] = useRecoilState(alertState);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (alert) setAlert(null);
    }, 750);
    return () => {
      clearTimeout(timer);
    };
  }, [alert]);

  const handleBackdropClick = () => {
    setAlert(null);
  };

  if (alert)
    return createPortal(
      <div className={styles.alertBackdrop} onClick={handleBackdropClick}>
        <div className={`${styles.alertContainer} ${styles[alert.type]}`}>
          <span>{alert.type === 'success' ? '✅' : '❌'}</span>
          <span>{alert.message ?? t(alert.type)}</span>
        </div>
      </div>,
      document.getElementById('alertRoot') as HTMLElement
    );
  return null;
}
