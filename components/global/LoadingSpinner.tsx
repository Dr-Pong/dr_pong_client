import React, { useEffect, useState } from 'react';

import styles from 'styles/global/LoadingSpinner.module.scss';

export default function LoadingSpinner({ useTimer }: { useTimer?: boolean }) {
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!useTimer) return;
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      {useTimer && <div className={styles.time}>{seconds}</div>}
    </div>
  );
}
