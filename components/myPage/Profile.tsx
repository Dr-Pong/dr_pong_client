import { useRecoilValue } from 'recoil';

import React from 'react';

import styles from 'styles/myPage/Profile.module.scss';

import { editableState } from '../../recoils/myPage';
import ProfileCard from './ProfileCard';
import SelectedItems from './SelectedItems';
import StatCard from './StatCard';

export default function Profile() {
  const editableStatus = useRecoilValue(editableState);
  return (
    <div className={styles.profile}>
      <ProfileCard />
      <StatCard />
      <div style={!editableStatus ? {} : { pointerEvents: 'none' }}>
        <SelectedItems itemType={'achieve'} />
      </div>
    </div>
  );
}
