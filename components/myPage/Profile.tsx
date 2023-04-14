import React from 'react';

import styles from 'styles/myPage/Profile.module.scss';

import ProfileCard from './ProfileCard';
import SelectedItems from './SelectedItems';
import StatCard from './StatCard';

export default function Profile() {
  return (
    <div className={styles.profile}>
      <ProfileCard />
      <StatCard />
      <SelectedItems itemType={'achieve'} />
    </div>
  );
} // SelectedItems에 업적 / 이모지 선택하는 프랍 넣기
