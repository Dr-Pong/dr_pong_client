import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, profileTabState } from 'recoils/user';

import { Achievement, Achievements, DetailDto } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import SelectableItem from 'components/myPage/SelectableItem';
import ProfileCard from 'components/myPage/profile/ProfileCard';
import ProfileImage from 'components/myPage/profile/ProfileImage';
import StatCard from 'components/myPage/profile/StatCard';
import StatusMessage from 'components/myPage/profile/StatusMessage';

import styles from 'styles/myPage/Profile.module.scss';

export default function Profile({ nickname }: { nickname: string }) {
  const editable = useRecoilValue(editableState);
  const profileTab = useRecoilValue(profileTabState);
  const { getSelected } = useMyPageQuery(nickname, 'achievements');
  const { data, isLoading, isError } = getSelected();
  const { patchProfile } = useMyPageQuery(nickname);
  const { patchImage, patchTitle, patchMessage } = patchProfile();
  const achievements = data as Achievements;
  const [detailDto, setDetailDto] = useState<DetailDto>(defaultDetailDto);

  useEffect(() => {
    if (detailDto === defaultDetailDto) return;
    if (!editable && profileTab === 'profile') {
      const { image, title, statusMessage } = detailDto;
      patchImage.mutate({
        id: image.id,
      });
      patchTitle.mutate({
        id: title?.id || null,
      });
      patchMessage.mutate({
        message: statusMessage,
      });
    }
  }, [editable]);

  return (
    <div className={styles.profileContainer}>
      <ProfileImage detailDto={detailDto} setDetailDto={setDetailDto} />
      <ProfileCard
        detailDto={detailDto}
        setDetailDto={setDetailDto}
        nickname={nickname}
      />
      <StatusMessage detailDto={detailDto} setDetailDto={setDetailDto} />
      <StatCard nickname={nickname} />
      {!isLoading && !isError && (
        <div className={styles.achievementsBox}>
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
  );
}

const defaultDetailDto: DetailDto = {
  image: {
    id: 0,
    url: '',
  },
  title: { id: 0, title: '' },
  statusMessage: '',
};
