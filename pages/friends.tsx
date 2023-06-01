import useTranslation from 'next-translate/useTranslation';
import { useRecoilState, useResetRecoilState } from 'recoil';

import React, { ReactElement } from 'react';

import { dropdownUserState, friendsTabState } from 'recoils/friends';

import { FriendTab } from 'types/friendTypes';

import FriendTabContents from 'components/friends/FriendTabContents';
import PageHeader from 'components/global/PageHeader';
import TabProvider from 'components/global/TabProvider';
import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';

import styles from 'styles/friends/Friends.module.scss';

export default function Friends() {
  const { t } = useTranslation('friends');
  const resetDropdownUserState = useResetRecoilState(dropdownUserState);
  const [tab, setTab] = useRecoilState(friendsTabState);

  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.target as HTMLDivElement;
    setTab(div.id as FriendTab);
    resetDropdownUserState();
  };

  return (
    <div className={styles.friendsPageContainer}>
      <PageHeader title={t('Friends')} />
      <div className={styles.friendsPageFrame}>
        <TabProvider
          namespace={'friends'}
          tabNames={['all', 'pending', 'block']}
          currentTab={tab}
          handleTabClick={handleTabClick}
        >
          <FriendTabContents key={tab} tab={tab} />
        </TabProvider>
      </div>
    </div>
  );
}

Friends.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <AppLayout>{page}</AppLayout>
    </LoginFilter>
  );
};
