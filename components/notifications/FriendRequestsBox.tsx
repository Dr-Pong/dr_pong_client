import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import Router from 'next/router';

import { friendsTabState } from 'recoils/friends';
import { sideBarState } from 'recoils/sideBar';

import useCustomQuery from 'hooks/useCustomQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';

import styles from 'styles/notifications/Notifications.module.scss';

export default function FriendRequestsBox() {
  const setSideBar = useSetRecoilState(sideBarState);
  const setFriendsTab = useSetRecoilState(friendsTabState);
  const { t } = useTranslation('common');
  const { get } = useCustomQuery();
  const { data, isLoading, isError } = get(
    ['notificationFriends'],
    '/users/notifications/friends'
  );

  if (isLoading) return <LoadingSpinner />;
  if (isError) return <ErrorRefresher />;

  const { requestCount } = data;

  const handleRouterToFriends = () => {
    setSideBar(null);
    setFriendsTab('pending');
    Router.push('/friends');
  };

  return (
    <div className={styles.friendRequestBox} onClick={handleRouterToFriends}>
      <span>{t('Friend requests')}</span>
      <span
        className={`${styles.requestCount} ${
          requestCount === 0 && styles.noRequestCount
        }`}
      >
        {requestCount}
      </span>
    </div>
  );
}
