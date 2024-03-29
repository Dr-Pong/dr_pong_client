import useTranslation from 'next-translate/useTranslation';
import { useRecoilState, useResetRecoilState } from 'recoil';

import React, { ReactElement, useEffect } from 'react';

import { dropdownUserState, friendsTabState } from 'recoils/friends';

import { FriendTab } from 'types/friendTypes';

import FriendTabContents from 'components/friends/FriendTabContents';
import PageHeader from 'components/global/PageHeader';
import SocketManager from 'components/global/SocketManager';
import TabProvider from 'components/global/TabProvider';
import AppLayout from 'components/layouts/AppLayout';
import Footer from 'components/layouts/Footer';

import styles from 'styles/friends/Friends.module.scss';

export default function Friends() {
  const { t } = useTranslation('friends');
  const resetDropdownUserState = useResetRecoilState(dropdownUserState);
  const resetFriendsTabState = useResetRecoilState(friendsTabState);
  const [tab, setTab] = useRecoilState(friendsTabState);

  useEffect(() => {
    return () => {
      resetFriendsTabState();
      resetDropdownUserState();
    };
  }, []);

  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.target as HTMLDivElement;
    setTab(div.id as FriendTab);
    resetDropdownUserState();
  };

  return (
    <div className={styles.friendsPageContainer}>
      <PageHeader title={t('Friends')} />
      <TabProvider
        namespace={'friends'}
        tabNames={['all', 'pending', 'blocked']}
        currentTab={tab}
        handleTabClick={handleTabClick}
      >
        <FriendTabContents key={tab} />
      </TabProvider>
      <Footer />
    </div>
  );
}

Friends.getLayout = function getLayout(page: ReactElement) {
  return (
    <>
      <SocketManager namespace={'friends'} />
      <AppLayout>{page}</AppLayout>
    </>
  );
};
