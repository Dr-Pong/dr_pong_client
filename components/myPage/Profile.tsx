import { useRecoilValue } from 'recoil';

import React from 'react';
import { useQuery } from 'react-query';

import { editableState } from 'recoils/myPage';

import ProfileCard from 'components/myPage/ProfileCard';
import StatCard from 'components/myPage/StatCard';

import styles from 'styles/myPage/Profile.module.scss';

import { Achievement, Emoji } from '../../types/myPageTypes';
import instance from '../../utils/axios';
import SelectTab from './SelectTab';
import SelectableItem from './SelectableItem';

export default function Profile({ userName }: { userName: string }) {
  const editableStatus = useRecoilValue(editableState);
  const fetchSelectedAchievements = async (): Promise<Achievement[]> => {
    const res = await instance.get(
      `/users/${userName}/achievements?selected=true`
    );
    return res.data;
  };
  const { data, isLoading, isError } = useQuery(
    'selectedAchievements',
    fetchSelectedAchievements
  );
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error</div>;
  const achievements = data as Achievement[];
  return (
    <div className={styles.profile}>
      <ProfileCard userName={userName} />
      <StatCard userName={userName} />
      <div
        className={styles.selectedItemsContainer}
        style={editableStatus ? { pointerEvents: 'none' } : {}}
      >
        <div className={styles.selectedItems}>
          {achievements.map((item) => (
            <SelectableItem
              key={item.id}
              itemType={'achieve'}
              item={item}
              clickHandler={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
