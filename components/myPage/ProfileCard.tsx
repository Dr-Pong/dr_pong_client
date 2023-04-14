import { useRecoilValue } from 'recoil';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosClose } from 'react-icons/io';

import styles from 'styles/myPage/ProfileCard.module.scss';

import { editableState } from '../../recoils/myPage';

export interface ProfileProps {
  nickname: string;
  title: string;
  level: number;
  imgUrl: string;
  statusMessage: string;
}
export default function ProfileCard() {
  const profileProps: ProfileProps = {
    nickname: 'hakim',
    title: 'the Boss',
    level: 1,
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    statusMessage: '내가 최고다 사실 아니다...',
  };
  const editable = useRecoilValue(editableState);
  const [statusMessage, setStatusMessage] = useState<string>(
    profileProps.statusMessage
  );
  const statusMessageHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setStatusMessage(event.target.value);
  };
  const handleDeleteButtonClick = () => {};
  const handleUploadButtonClick = () => {};
  const { t } = useTranslation(['page']);
  const { nickname, title, level, imgUrl } = profileProps;

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileTag}>
        <div className={styles.profileImgFrame}>
          <img className={styles.profileImg} src={imgUrl} alt='profileImg' />
          {editable && (
            <div className={styles.imgOverlay}>
              <div
                className={styles.deleteButton}
                onClick={handleDeleteButtonClick}
              >
                <IoIosClose />
              </div>
              <div
                className={styles.uploadButton}
                onClick={handleUploadButtonClick}
              >
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
