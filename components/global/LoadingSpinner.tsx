import React from 'react';

import styles from 'styles/global/LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner} />
    </div>
  );
}

export default React.memo(LoadingSpinner);