import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, profileTabState } from 'recoils/user';

import { Achievement, DetailDto, ProfileStyle } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import LoadingSpinner from 'components/global/LoadingSpinner';
import SelectableItem from 'components/myPage/SelectableItem';
import ProfileCard from 'components/myPage/profile/ProfileCard';
import ProfileImage from 'components/myPage/profile/ProfileImage';
import StatCard from 'components/myPage/profile/StatCard';
import StatusMessage from 'components/myPage/profile/StatusMessage';

import styles from 'styles/myPage/Profile.module.scss';

type ProfileProps = {
  nickname: string;
  style: ProfileStyle;
};

export default function Profile({ nickname, style }: ProfileProps) {
  const editable = useRecoilValue(editableState);
  const profileTab = useRecoilValue(profileTabState);
  const { profileMutationPatch } = useMyPageQuery(nickname);
  const { patchImage, patchTitle, patchMessage } = profileMutationPatch();
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
    <div className={`${styles.profileContainer} ${styles[style]}`}>
      <ProfileImage detailDto={detailDto} setDetailDto={setDetailDto} />
      <ProfileCard
        detailDto={detailDto}
        setDetailDto={setDetailDto}
        nickname={nickname}
        style={style}
      />
      <StatusMessage
        detailDto={detailDto}
        setDetailDto={setDetailDto}
        style={style}
      />
      <StatCard nickname={nickname} style={style} />
      <SelectedAchievements nickname={nickname} style={style} />
    </div>
  );
}

function SelectedAchievements({
  nickname,
  style,
}: {
  nickname: string;
  style: ProfileStyle;
}) {
  const { selectedGet } = useMyPageQuery(nickname, 'achievements');
  const { data, isLoading, isError } = selectedGet();

  if (isLoading || isError)
    return (
      <div className={`${styles.achievementsBox} ${styles[style]}`}>
        <LoadingSpinner />
      </div>
    );

  if (data.achievements.filter((el: Achievement | null) => el).length == 0)
    return null;

  return (
    <div className={`${styles.achievementsBox} ${styles[style]}`}>
      {data.achievements.map((item: Achievement | null) => (
        <SelectableItem
          key={item?.id}
          itemType={'achieve'}
          item={item}
          clickHandler={null}
        />
      ))}
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
