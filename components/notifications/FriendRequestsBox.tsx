import useTranslation from 'next-translate/useTranslation';
import { useSetRecoilState } from 'recoil';

import { useRouter } from 'next/router';

import React, { useEffect, useState } from 'react';

import { friendsTabState } from 'recoils/friends';
import { sideBarState } from 'recoils/sideBar';

import useChatSocket from 'hooks/useChatSocket';
import useCustomQuery from 'hooks/useCustomQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';

import styles from 'styles/notifications/Notifications.module.scss';

export default function FriendRequestsBox() {
  const router = useRouter();
  const setSideBar = useSetRecoilState(sideBarState);
  const setFriendsTab = useSetRecoilState(friendsTabState);
  const { t } = useTranslation('common');
  const { get } = useCustomQuery();
  const { data, isLoading, isError, error } = get(
    ['notificationFriends'],
    '/users/notifications/friends'
  );
  const [socket] = useChatSocket('global');
  const [newFriendRequest, setNewFriendRequest] = useState<number>(0);

  useEffect(() => {
    const newFriendRequestListener = () => {
      setNewFriendRequest((prev) => prev + 1);
    };
    socket.on('friend', newFriendRequestListener);
    return () => {
      socket.off('friend', newFriendRequestListener);
    };
  }, []);

  if (isError) return <ErrorRefresher error={error} />;

  const handleRouterToFriends = () => {
    setSideBar(null);
    setFriendsTab('pending');
    router.push('/friends');
  };

  const getTotalCount = () => {
    if (!data || isLoading) return 0;
    return data.requestCount + newFriendRequest > 99
      ? 99
      : data.requestCount + newFriendRequest;
  };

  return (
    <div className={styles.friendRequestBox} onClick={handleRouterToFriends}>
      <span>{t('Friend requests')}</span>
      <span
        className={`${styles.requestCount} ${
          getTotalCount() === 0 && styles.noRequestCount
        }`}
      >
        {getTotalCount()}
      </span>
    </div>
  );
}
