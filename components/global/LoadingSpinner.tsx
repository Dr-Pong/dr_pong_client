import React from 'react';

import styles from 'styles/global/LoadingSpinner.module.scss';

export default function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
    </div>
  );
}
