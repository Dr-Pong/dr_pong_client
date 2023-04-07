import React from 'react';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import styles from 'styles/MyPage/MyPageFrame.module.scss';

import Profile from './Profile';
import SelectTab from './SelectTab';

export enum EditableStatus {
  PLAIN,
  EDIT,
  DROPDOWN,
  REMOVABLE,
}

export enum MyPageTab {
  PROFILE,
  ACHIEVE,
  EMOJI,
}
export default function MyPageFrame() {
  const [onWhichTab, setOnWhichTab] = useState<MyPageTab>(MyPageTab.PROFILE);
  const [editableStatus, setEditableStatus] = useState<EditableStatus>(
    EditableStatus.PLAIN
  );
  const toggleEditableStatus = () => {
    if (editableStatus == EditableStatus.PLAIN) {
      setEditableStatus(EditableStatus.EDIT);
    } else if (editableStatus == EditableStatus.EDIT) {
      setEditableStatus(EditableStatus.PLAIN);
    }
  };

  const { t } = useTranslation(['page']);
  return (
    <div className={styles.myPageFrame}>
      <div className={styles.pageTitle}>{t('My Page')}</div>
      <div className={styles.editButtonContainer}>
        <div className={styles.editButton} onClick={toggleEditableStatus}>
          {editableStatus == EditableStatus.PLAIN && t('edit')}
          {editableStatus == EditableStatus.EDIT && t('save')}
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
        {onWhichTab == MyPageTab.PROFILE && (
          <Profile editableStatus={editableStatus} />
        )}
        {onWhichTab == MyPageTab.ACHIEVE && (
          <SelectTab onWhichTab={onWhichTab} editableStatus={editableStatus} />
        )}
        {onWhichTab == MyPageTab.EMOJI && (
          <SelectTab onWhichTab={onWhichTab} editableStatus={editableStatus} />
        )}
      </div>
    </div>
  );
}
