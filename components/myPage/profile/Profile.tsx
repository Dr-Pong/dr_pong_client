import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, profileTabState } from 'recoils/user';

import {
  Achievement,
  Achievements,
  Image,
  ProfileStyle,
  Title,
  UserDetail,
} from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import ErrorRefresher from 'components/global/ErrorRefresher';
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
  const [user, setUser] = useState<UserDetail>(defaultUser);
  const [editClicked, setEditClicked] = useState<boolean>(false);
  const { profileGet, profileMutationPatch } = useMyPageQuery(nickname);
  const { patchImage, patchTitle, patchMessage } = profileMutationPatch();
  const { isLoading, isError } = profileGet(setUser);
  const [image, setImage] = useState<Image>(defaultUser.image);
  const [title, setTitle] = useState<Title | null>(null);
  const [statusMessage, setStatusMessage] = useState<string>('');

  useEffect(() => {
    if (editable) setEditClicked(true);
    if (!editable && profileTab === 'profile' && editClicked) {
      if (image.id && image !== user.image)
        patchImage.mutate({
          id: image.id,
        });
      if (title !== user.title)
        patchTitle.mutate({
          id: title?.id || null,
        });
      if (statusMessage !== user.statusMessage)
        patchMessage.mutate({
          message: statusMessage,
        });
    }
  }, [editable]);

  useEffect(() => {
    setImage(user.image);
    setTitle(user.title);
    setStatusMessage(user.statusMessage);
  }, [user]);

  if (isError) return <ErrorRefresher />;

  return isLoading ? (
    <LoadingSpinner />
  ) : (
    <div className={`${styles.profileContainer} ${styles[style]}`}>
      <ProfileImage image={image} setImage={setImage} />
      <ProfileCard
        nickname={nickname}
        level={user.level}
        title={title}
        setTitle={setTitle}
        style={style}
      />
      <StatusMessage
        statusMessage={statusMessage}
        setStatusMessage={setStatusMessage}
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
  const [{ achievements }, setAchievements] = useState<Achievements>({
    achievements: Array(3).fill(null),
  });
  const achievementsGet = selectedGet(setAchievements);

  if (achievements.filter((el: Achievement | null) => el).length == 0)
    return null;

  return (
    <div className={`${styles.achievementsBox} ${styles[style]}`}>
      {achievements.map((item: Achievement | null) => (
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

const defaultUser: UserDetail = {
  nickname: '',
  image: {
    id: 0,
    url: '',
  },
  level: 0,
  title: { id: 0, title: '-----' },
  statusMessage: '',
};
