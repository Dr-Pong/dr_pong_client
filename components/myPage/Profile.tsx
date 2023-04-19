import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState } from 'recoils/myPage';

import ProfileCard from 'components/myPage/ProfileCard';
import SelectedItems from 'components/myPage/SelectedItems';
import StatCard from 'components/myPage/StatCard';

import styles from 'styles/myPage/Profile.module.scss';

export default function Profile({ userName }: { userName: string }) {
  const editableStatus = useRecoilValue(editableState);
  return (
    <div className={styles.profile}>
      <ProfileCard userName={userName} />
      <StatCard userName={userName} />
      <div
        className={styles.selectedItemsContainer}
        style={editableStatus ? { pointerEvents: 'none' } : {}}
      >
        <SelectedItems userName={userName} itemType={'achieve'} />
      </div>
    </div>
  );
}
