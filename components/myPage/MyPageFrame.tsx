import { useRecoilState } from 'recoil';

import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from 'styles/MyPage/MyPageFrame.module.scss';

import { editableState } from '../../recoils/myPage';
import Profile from './Profile';
import SelectTab from './SelectTab';

export enum MyPageTab {
  PROFILE,
  ACHIEVE,
  EMOJI,
}
export default function MyPageFrame() {
  const [onWhichTab, setOnWhichTab] = useState<MyPageTab>(MyPageTab.PROFILE);
  const [editableStatus, setEditableStatus] = useRecoilState(editableState);
  const toggleEditableStatus = () => {
    setEditableStatus(!editableStatus);
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
        <div
          className={styles.goTo}
          onClick={() => setOnWhichTab(MyPageTab.PROFILE)}
        >
          {t('profile')}
        </div>
        <div
          className={styles.goTo}
          onClick={() => setOnWhichTab(MyPageTab.ACHIEVE)}
        >
          {t('achieve')}
        </div>
        <div
          className={styles.goTo}
          onClick={() => setOnWhichTab(MyPageTab.EMOJI)}
        >
          {t('emoji')}
        </div>
      </div>
      <div className={styles.tabContainer}>
        {onWhichTab == MyPageTab.PROFILE && <Profile />}
        {onWhichTab == MyPageTab.ACHIEVE && (
          <SelectTab onWhichTab={onWhichTab} />
        )}
        {onWhichTab == MyPageTab.EMOJI && <SelectTab onWhichTab={onWhichTab} />}
      </div>
    </div>
  );
}
