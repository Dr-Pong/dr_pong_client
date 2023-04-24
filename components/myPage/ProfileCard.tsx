import { useRecoilValue } from 'recoil';

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useMutation, useQuery } from 'react-query';

import { editableState, tabState } from 'recoils/myPage';

import { PatchDetail, Title, UserDetail } from 'types/myPageTypes';

import instance from 'utils/axios';

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
  const { t } = useTranslation(['page']);
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
  const fetchProfile = async (): Promise<UserDetail> => {
    const res = await instance.get(`/users/${userName}/detail`);
    setDetailDto(res.data);
    return res.data;
  };
  const {
    isLoading,
    isError,
    data: userDetail,
  } = useQuery('userDetail', fetchProfile);
  const patchDetail = async (detail: PatchDetail): Promise<PatchDetail> => {
    const { data } = await instance.patch<PatchDetail>(
      `/users/${userName}/detail`,
      detail
    );
    console.log(detail);
    return data;
  };

  const { mutate } = useMutation(patchDetail);

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
