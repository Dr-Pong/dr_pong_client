import { useRecoilState } from 'recoil';

import React from 'react';

import { friendsTabState } from 'recoils/friends';

import { FriendTab } from 'types/friendTypes';

import FriendTabContents from 'components/friends/FriendTabContents';
import TabsViewProvider from 'components/global/TabsViewProvider';

import styles from 'styles/friends/FriendsPageFrame.module.scss';

export default function FriendsPageFrame() {
  const [tab, setTab] = useRecoilState(friendsTabState);

  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.target as HTMLDivElement;
    setTab(div.id as FriendTab);
  };

  return (
    <div className={styles.friendsPageFrame}>
      <TabsViewProvider
        namespace={'friends'}
        tabNames={['friend', 'request', 'block']}
        handleTabClick={handleTabClick}
      >
        <FriendTabContents key={tab} tab={tab} />
      </TabsViewProvider>
    </div>
  );
}
