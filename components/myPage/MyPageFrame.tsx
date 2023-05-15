import { useRecoilState, useRecoilValue } from 'recoil';

import React from 'react';

import { editableState, profileTabState, userState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';

import TabsViewProvider from 'components/global/TabsViewProvider';
import SelectTab from 'components/myPage/SelectTab';
import EditButton from 'components/myPage/profile/EditButton';
import Profile from 'components/myPage/profile/Profile';

import styles from 'styles/MyPage/MyPageFrame.module.scss';

export default function MyPageFrame() {
  const [tab, setTab] = useRecoilState(profileTabState);
  const [editable, setEditable] = useRecoilState(editableState);
  const user = useRecoilValue(userState);
  const { useEditWarningModal } = useModalProvider();
  const { nickname } = user;

  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const div = event.target as HTMLDivElement;
    if (tab === div.id) return;
    if (editable)
      useEditWarningModal(() => {
        setEditable(false);
        setTab(div.id);
      });
    else setTab(div.id);
  };

  const tabs: { [key: string]: JSX.Element } = {
    profile: <Profile nickname={nickname} key={'profile'} />,
    achieve: (
      <SelectTab nickname={nickname} itemType={'achieve'} key={'achieve'} />
    ),
    emoji: <SelectTab nickname={nickname} itemType={'emoji'} key={'emoji'} />,
  };

  return (
    <div className={styles.myPageFrame}>
      <div className={styles.editButtonContainer}>
        <EditButton />
      </div>
      <TabsViewProvider
        namespace={'myPage'}
        tabNames={Object.keys(tabs)}
        handleTabClick={handleTabClick}
      >
        {tabs[tab]}
      </TabsViewProvider>
    </div>
  );
}
