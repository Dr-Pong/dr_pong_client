import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import React, { useEffect, useState } from 'react';

import { alertState } from 'recoils/alert';

import useChatSocket from 'hooks/useChatSocket';

import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/global/QueueSpinner.module.scss';

export default function QueueSpinner({
  useTimer,
  handleGameCancel,
}: {
  useTimer: boolean;
  handleGameCancel: () => void;
}) {
  const { t } = useTranslation('game');
  const setAlert = useSetRecoilState(alertState);
  const [seconds, setSeconds] = useState(0);
  const [socket] = useChatSocket('global');

  useEffect(() => {
    const handleGameRejection = () => {
      setAlert({
        type: 'warning',
        message: t('rejection'),
      });
      handleGameCancel();
    };
    socket.on('deleteInvite', handleGameRejection);
    (document.activeElement as HTMLElement)?.blur();

    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => {
      socket.off('deleteInvite', handleGameRejection);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className={styles.queueSpinnerContainer}>
      <LoadingSpinner />
      {useTimer && <div className={styles.time}>{seconds}</div>}
    </div>
  );
}
