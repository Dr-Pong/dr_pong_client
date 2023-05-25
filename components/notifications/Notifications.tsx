import FriendRequestsBox from 'components/notifications/FriendRequestsBox';

import styles from 'styles/notifications/Notifications.module.scss';

import Invitations from './Invitations';

export default function Notifications() {
  return (
    <div className={styles.notificationsContainer}>
      <FriendRequestsBox />
      <div className={styles.line}></div>
      <Invitations />
    </div>
  );
}
