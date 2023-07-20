import React from 'react';

import FriendRequestsBox from 'components/notifications/FriendRequestsBox';
import InvitationList from 'components/notifications/InvitationList';

import styles from 'styles/notifications/Notifications.module.scss';

export default function Notifications() {
  return (
    <div className={styles.notificationsContainer}>
      <FriendRequestsBox />
      <div className={styles.line}></div>
      <InvitationList />
    </div>
  );
}
