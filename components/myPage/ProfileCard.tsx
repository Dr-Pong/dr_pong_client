import { init } from 'i18next';
import { useRecoilValue } from 'recoil';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosClose } from 'react-icons/io';
import { useQuery } from 'react-query';

import styles from 'styles/myPage/ProfileCard.module.scss';

import { editableState } from '../../recoils/myPage';
import { UserDetail } from '../../types/myPageTypes';
import instance from '../../utils/axios';

export default function ProfileCard({ userName }: { userName: string }) {
  const { t } = useTranslation(['page']);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const editable = useRecoilValue(editableState);
  const fetchProfile = async (): Promise<UserDetail> => {
    const res = await instance.get(`/users/${userName}/detail`);
    setStatusMessage(res.data.statusMessage);
    return res.data;
  };
  const { data, isLoading, isError } = useQuery('userProfile', fetchProfile);

  const statusMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(event.target.value);
  };
  const handleDeleteClick = () => {};
  const handleUploadClick = () => {};
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const { nickname, title, level, imgUrl } = data as UserDetail;

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileTag}>
        <div className={styles.profileImgFrame}>
          <img className={styles.profileImg} src={imgUrl} alt='profileImg' />
          {editable && (
            <div className={styles.imgOverlay}>
              <div className={styles.deleteButton} onClick={handleDeleteClick}>
                <IoIosClose />
              </div>
              <div className={styles.uploadButton} onClick={handleUploadClick}>
                {t('upload file')}
              </div>
            </div>
          )}
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Title')}</span>
            {editable ? 'dropdown' : title}
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
      <div className={styles.statusMessage}>
        {editable ? (
          <input
            className={styles.content}
            type='text'
            value={statusMessage}
            onChange={statusMessageHandler}
          />
        ) : (
          <div className={styles.content}>{statusMessage}</div>
        )}
      </div>
    </div>
  );
}

// const initVal: UserDetail = {
//   nickname: '',
//   title: '',
//   level: 0,
//   statusMessage: '',
//   imgUrl: '',
// };
