import React from 'react';

import styles from 'styles/global/LoadingSpinner.module.scss';

function LoadingSpinner() {
  return (
    <div className={styles.loadingSpinnerContainer}>
      <div className={styles.spinner} />
    </div>
  );
}

export default React.memo(LoadingSpinner);
