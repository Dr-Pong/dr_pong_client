import React, { useEffect, useState } from 'react';

import styles from 'styles/global/LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  const [seconds, setSeconds] = useState(0);
  useEffect(() => {
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
      <div className={styles.time}>{seconds}</div>
    </div>
  );
}
