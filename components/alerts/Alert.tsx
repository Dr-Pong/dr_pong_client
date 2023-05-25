import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React, { useEffect } from "react";
import { createPortal } from 'react-dom';

import { openAlertState } from 'recoils/alert';

import styles from 'styles/alerts/Alert.module.scss';

export default function Alert({ isError }: { isError: boolean }) {
  const { t } = useTranslation('common');
  const [openAlert, setOpenAlert] = useRecoilState(openAlertState);
  const message = isError ? t('failure') : t('success');

  useEffect(() => {
    const timer = setTimeout(() => {
      setOpenAlert(false);
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
        <div className={styles.alertContainer}>{message}</div>
      </div>,
      document.getElementById('alertRoot') as HTMLElement
    );
  return null;
}
