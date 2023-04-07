import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosClose } from 'react-icons/io';

import EditableContent from 'components/myPage/EditableContent';
import { EditableStatus } from 'components/myPage/MyPageFrame';

import styles from 'styles/myPage/ProfileCard.module.scss';

export interface ProfileProps {
  nickname: string;
  title: string;
  level: number;
  imgUrl: string;
  statusMessage: string;
}
export default function ProfileCard({
  editableStatus,
}: {
  editableStatus: EditableStatus;
}) {
  const { t } = useTranslation(['page']);
  const profileProps: ProfileProps = {
    nickname: 'hakim',
    title: 'the Boss',
    level: 1,
    imgUrl:
      'https://42gg-public-image.s3.ap-northeast-2.amazonaws.com/images/hakim.jpeg?imwidth=100',
    statusMessage: '내가 최고다 사실 아니다...',
  };
  const { nickname, title, level, imgUrl, statusMessage } = profileProps;

  return (
    <div className={styles.profileCard}>
      <div className={styles.profileTag}>
        <div className={styles.profileImgFrame}>
          <img className={styles.profileImg} src={imgUrl} alt='profileImg' />
          <div className={styles.imgOverlay}>
            <div className={styles.closeButton}>
              {/*<IoIosClose />*/}
            </div>
            {/*<div className={styles.uploadButton}>{t('upload file')}</div>*/}
          </div>
        </div>
        <div className={styles.profileInfo}>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Title')}</span>
            <EditableContent
              content={title}
              editableStatus={
                editableStatus == EditableStatus.PLAIN
                  ? EditableStatus.PLAIN
                  : EditableStatus.DROPDOWN
              }
            />
          </div>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Level')}</span>
            <EditableContent
              content={level.toString()}
              editableStatus={EditableStatus.PLAIN}
            />
          </div>
          <div className={styles.captionContentBar}>
            <span className={styles.caption}>{t('Name')}</span>
            <EditableContent
              content={nickname}
              editableStatus={editableStatus}
            />
          </div>
        </div>
      </div>
      <div className={styles.statusMessage}>
        <EditableContent
          content={statusMessage}
          editableStatus={editableStatus}
        />
      </div>
    </div>
  );
}