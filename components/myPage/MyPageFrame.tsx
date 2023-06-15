import useTranslation from 'next-translate/useTranslation';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import React, { useEffect, MouseEvent } from 'react';

import { editableState, profileTabState, userState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';

import TabProvider from 'components/global/TabProvider';
import BasicButton from 'components/global/buttons/BasicButton';
import SelectTab from 'components/myPage/SelectTab';
import Profile from 'components/myPage/profile/Profile';

import { ProfileTab } from 'types/userTypes';

import styles from 'styles/myPage/MyPage.module.scss';

export default function MyPageFrame() {
  const { t } = useTranslation('myPage');
  const [tab, setTab] = useRecoilState(profileTabState);
  const resetProfileTabState = useResetRecoilState(profileTabState);
  const [editable, setEditable] = useRecoilState(editableState);
  const { nickname } = useRecoilValue(userState);
  const { useEditWarningModal } = useModalProvider();

  const handleTabChange = (event: MouseEvent<HTMLDivElement>) => {
    const div = event.target as HTMLDivElement;
    if (tab === div.id as ProfileTab) return;
    if (editable)
      useEditWarningModal(() => {
        setEditable(false);
        setTab(div.id as ProfileTab);
      });
    else setTab(div.id as ProfileTab);
  };

  const tabs: { [key: string]: JSX.Element } = {
    profile: <Profile nickname={nickname} key={'profile'} style='page' />,
    achieve: (
      <SelectTab nickname={nickname} itemType={'achieve'} key={'achieve'} />
    ),
    emoji: <SelectTab nickname={nickname} itemType={'emoji'} key={'emoji'} />,
  };

  const handleEditButtonClick = () => {
    setEditable(!editable);
  };

  useEffect(() => {
    return () => {
      resetProfileTabState();
      setEditable(false);
    };
  }, []);

  return (
    <div className={styles.myPageFrame}>
      <BasicButton
        style='small'
        color='pink'
        handleButtonClick={handleEditButtonClick}
      >
        {editable ? t('save') : t('edit')}
      </BasicButton>
      <TabProvider
        namespace={'myPage'}
        tabNames={Object.keys(tabs)}
        currentTab={tab}
        handleTabClick={handleTabChange}
      >
        {tabs[tab]}
      </TabProvider>
    </div>
  );
}
