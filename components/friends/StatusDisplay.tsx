import React from 'react';

import styles from 'styles/friends/StatusDisplay.module.scss';

import { Activity } from 'types/friendTypes';

export default function StatusDisplay({
  status,
  children,
}: {
  status?: Activity;
  children: React.ReactNode;
}) {
  if (!status) {
    return <div>{children}</div>;
  }
  return (
    <div className={styles.statusOverlay}>
      <div>{children}</div>
      <div className={styles[status]} />
    </div>
  );
}
