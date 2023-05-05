import useTranslation from 'next-translate/useTranslation';
import { useRecoilState, useRecoilValue } from 'recoil';

import React, { useEffect } from 'react';

import { editableState, tabState, userState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';

import SelectTab from 'components/myPage/SelectTab';
import Profile from 'components/myPage/profile/Profile';

import styles from 'styles/MyPage/MyPageFrame.module.scss';

export default function MyPageFrame() {
  const { t } = useTranslation('myPage');
  const [tab, setTab] = useRecoilState(tabState);
  const [editable, setEditable] = useRecoilState(editableState);
  const user = useRecoilValue(userState);
  const { useEditWarningModal } = useModalProvider();
  const { nickname } = user;
  useEffect(() => {
    return () => {
      setEditable(false);
    };
  }, []);
  const handleEditButtonClick = () => {
    setEditable(!editable);
  };
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
        <div className={styles.editButton} onClick={handleEditButtonClick}>
          {editable ? t('save') : t('edit')}
        </div>
      </div>
      <div className={styles.goToContainer}>
        {Object.keys(tabs).map((tabName) => {
          return (
            <div
              id={tabName}
              key={tabName}
              className={styles.goTo}
              onClick={handleTabClick}
            >
              {t(tabName)}
            </div>
          );
        })}
      </div>
      <div className={styles.tabContainer}>{tabs[tab]}</div>
    </div>
  );
}
