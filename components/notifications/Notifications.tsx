import FriendRequestsBox from 'components/notifications/FriendRequestsBox';
import Invitations from 'components/notifications/Invitations';

import styles from 'styles/notifications/Notifications.module.scss';

export default function Notifications() {
  return (
    <div className={styles.notificationsContainer}>
      <FriendRequestsBox />
      <div className={styles.line}></div>
      <Invitations />
    </div>
  );
}
