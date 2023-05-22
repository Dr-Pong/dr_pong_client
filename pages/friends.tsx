import useTranslation from 'next-translate/useTranslation';
import { useRecoilState } from 'recoil';

import React, { ReactElement } from 'react';

import { friendsTabState } from 'recoils/friends';

import { FriendTab } from 'types/friendTypes';

import FriendTabContents from 'components/friends/FriendTabContents';
import PageHeader from 'components/global/PageHeader';
import TabsViewProvider from 'components/global/TabsViewProvider';
import LoginFilter from 'components/layouts/LoginFilter';
import NavigationLayout from 'components/layouts/NavigationLayout';

import styles from 'styles/friends/Friends.module.scss';

export default function Friends() {
  const { t } = useTranslation('friends');

  const [tab, setTab] = useRecoilState(friendsTabState);

  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.target as HTMLDivElement;
    setTab(div.id as FriendTab);
  };

  return (
    <div className={styles.friendsPageContainer}>
      <PageHeader title={t('Friends')} />
      <div className={styles.friendsPageFrame}>
        <TabsViewProvider
          namespace={'friends'}
          tabNames={['all', 'pending', 'block']}
          handleTabClick={handleTabClick}
        >
          <FriendTabContents key={tab} tab={tab} />
        </TabsViewProvider>
      </div>
    </div>
  );
}

Friends.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <NavigationLayout>{page}</NavigationLayout>
    </LoginFilter>
  );
};
