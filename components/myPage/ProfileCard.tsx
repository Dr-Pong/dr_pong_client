import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';

import { editableState, tabState } from 'recoils/user';

import { Title, UserDetail } from 'types/userTypes';

import useMyPageQuery from 'hooks/useMyPageQuery';

import ProfileImage from 'components/myPage/ProfileImage';
import ProfileStatusMessage from 'components/myPage/ProfileStatusMessage';
import TitleDropdown from 'components/myPage/TitleDropdown';

import styles from 'styles/myPage/ProfileCard.module.scss';

export interface DetailDto {
  imgUrl: string | null;
  title: Title;
  statusMessage: string;
}
export default function ProfileCard({ userName }: { userName: string }) {
  const { t } = useTranslation('myPage');
  const { getProfile, patchProfile } = useMyPageQuery(userName);
  const editable = useRecoilValue(editableState);
  const tab = useRecoilValue(tabState);
  const [detailDto, setDetailDto] = useState<DetailDto>(defaultDetailDto);
  useEffect(() => {
    if (detailDto === defaultDetailDto) return;
    if (!editable && tab === 'profile') {
      const title = detailDto.title.id == 0 ? null : detailDto.title.id;
      mutate({
        imgUrl: detailDto.imgUrl,
        title: title,
        message: detailDto.statusMessage,
      });
    }
  }, [editable]);

  const { isLoading, isError, data: userDetail } = getProfile(setDetailDto);
  const { mutate } = patchProfile();

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const { nickname, level } = userDetail as UserDetail;

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
        userName={userName}
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
  imgUrl: '',
  title: { id: 0, title: '' },
  statusMessage: '',
};
