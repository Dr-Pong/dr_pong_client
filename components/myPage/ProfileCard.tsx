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
      mutate({
        imgUrl: detailDto.imgUrl,
        title: detailDto.title.id,
        message: detailDto.statusMessage,
      });
    }
  }, [editable]);
  const fetchProfile = async (): Promise<UserDetail> => {
    const res = await instance.get(`/users/${userName}/detail`);
    setDetailDto({
      imgUrl: res.data.imgUrl,
      title: { id: 0, title: res.data.title },
      statusMessage: res.data.statusMessage,
    });
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

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileTag}>
        <ProfileImage detailDto={detailDto} setDetailDto={setDetailDto} />
        <div className={styles.profileInfo}>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Title')}</span>
            {detailDto.title.title}
            <TitleDropdown
              detailDto={detailDto}
              setDetailDto={setDetailDto}
              userName={userName}
            />
          </div>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Level')}</span>
            {level.toString()}
          </div>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Name')}</span>
            {nickname}
          </div>
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
