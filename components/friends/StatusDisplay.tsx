import React from 'react';

import { Activity } from 'types/friendTypes';

import styles from 'styles/friends/StatusDisplay.module.scss';

export default function StatusDisplay({
  status,
  children,
}: {
  status?: Activity;
  children: JSX.Element;
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
