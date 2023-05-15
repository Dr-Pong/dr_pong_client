import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, profileTabState } from 'recoils/user';

import { Image, Title, UserDetail } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import ProfileImage from 'components/myPage/profile/ProfileImage';
import ProfileStatusMessage from 'components/myPage/profile/ProfileStatusMessage';
import TitleDropdown from 'components/myPage/profile/TitleDropdown';

import styles from 'styles/myPage/ProfileCard.module.scss';

export interface DetailDto {
  image: Image;
  title: Title;
  statusMessage: string;
}
export default function ProfileCard({ nickname }: { nickname: string }) {
  const { t } = useTranslation('myPage');
  const { getProfile, patchProfile } = useMyPageQuery(nickname);
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(profileTabState);
  const [detailDto, setDetailDto] = useState<DetailDto>(defaultDetailDto);
  useEffect(() => {
    if (detailDto === defaultDetailDto) return;
    if (!editable && tab === 'profile') {
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

  const { isLoading, isError, data: userDetail } = getProfile(setDetailDto);
  const { patchImage, patchTitle, patchMessage } = patchProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const { level } = userDetail as UserDetail;

  const captionContent = (
    key: number,
    label: string,
    content: string,
    child: React.ReactNode = <></>
  ) => {
    return (
      <div key={key} className={styles.captionContentBar}>
        <span className={styles.caption}>{label}</span>
        <div className={styles.content}>
          {content}
          {child}
        </div>
      </div>
    );
  };

  const captionContents = [
    captionContent(
      1,
      t('Title'),
      detailDto.title?.title ?? '',
      <TitleDropdown
        detailDto={detailDto}
        setDetailDto={setDetailDto}
        nickname={nickname}
      />
    ),
    captionContent(2, t('Level'), level.toString()),
    captionContent(3, t('Name'), nickname),
  ];

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileTag}>
        <ProfileImage detailDto={detailDto} setDetailDto={setDetailDto} />
        <div className={styles.profileInfo}>
          {captionContents.map((captionContent) => captionContent)}
        </div>
      </div>
      <ProfileStatusMessage detailDto={detailDto} setDetailDto={setDetailDto} />
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
