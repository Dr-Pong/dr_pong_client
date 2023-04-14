import { useRecoilState } from 'recoil';

import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from 'styles/MyPage/MyPageFrame.module.scss';

import { editableState } from '../../recoils/myPage';
import Profile from './Profile';
import SelectTab from './SelectTab';

export default function MyPageFrame() {
  const [tab, setTab] = useState<string>('profile');
  const [editableStatus, setEditableStatus] = useRecoilState(editableState);
  const toggleEditableStatus = () => {
    setEditableStatus(!editableStatus);
  };

  const tabs: { [key: string]: JSX.Element } = {
    profile: <Profile />,
    achieve: <SelectTab onWhichTab={'achieve'} />,
    emoji: <SelectTab onWhichTab={'emoji'} />,
  };

  const { t } = useTranslation(['page']);

  return (
    <div className={styles.myPageFrame}>
      <div className={styles.pageTitle}>{t('My Page')}</div>
      <div className={styles.editButtonContainer}>
        <div className={styles.editButton} onClick={toggleEditableStatus}>
          {editableStatus ? t('save') : t('edit')}
        </div>
      </div>
      <div className={styles.goToContainer}>
        {Object.keys(tabs).map((tabName) => {
          return (
            <div
              key={tabName}
              className={styles.goTo}
              onClick={() => setTab(tabName)}
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
