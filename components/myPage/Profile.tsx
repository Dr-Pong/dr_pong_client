import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState } from 'recoils/myPage';

import { Achievement, Achievements } from 'types/myPageTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import ProfileCard from 'components/myPage/ProfileCard';
import SelectableItem from 'components/myPage/SelectableItem';
import StatCard from 'components/myPage/StatCard';

import styles from 'styles/myPage/Profile.module.scss';

export default function Profile({ userName }: { userName: string }) {
  const { getSelected } = useMyPageQuery(userName, 'achievements');
  const editableStatus = useRecoilValue(editableState);
  const { data, isLoading, isError } = getSelected();
  const achievements = data as Achievements;
  return (
    <div className={styles.profile}>
      <ProfileCard userName={userName} />
      <StatCard userName={userName} />
      <div
        className={styles.selectedItemsContainer}
        style={editableStatus ? { pointerEvents: 'none' } : {}}
      >
        {!isLoading && !isError && (
          <div className={styles.selectedItems}>
            {achievements.achievements.map((item: Achievement | null) => (
              <SelectableItem
                key={item?.id}
                itemType={'achieve'}
                item={item}
                clickHandler={null}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
