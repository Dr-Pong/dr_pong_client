import { useRecoilValue } from 'recoil';

import React from 'react';

import styles from 'styles/myPage/Profile.module.scss';

import { editableState } from '../../recoils/myPage';
import ProfileCard from './ProfileCard';
import SelectedItems from './SelectedItems';
import StatCard from './StatCard';

export default function Profile({ userName }: { userName: string }) {
  const editableStatus = useRecoilValue(editableState);
  return (
    <div className={styles.profile}>
      <ProfileCard userName={userName} />
      <StatCard userName={userName} />
      <div
        className={styles.selectedItemsContainer}
        style={!editableStatus ? {} : { pointerEvents: 'none' }}
      >
        <SelectedItems userName={userName} itemType={'achieve'} />
      </div>
    </div>
  );
}
