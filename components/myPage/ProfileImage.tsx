import { useRecoilValue } from 'recoil';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { IoIosClose } from 'react-icons/io';

import { editableState } from 'recoils/myPage';

import { DetailDto } from 'components/myPage/ProfileCard';

import styles from 'styles/myPage/ProfileImage.module.scss';

export default function ProfileImage({
  detailDto,
  setDetailDto,
}: {
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
}) {
  const { t } = useTranslation(['page']);
  const editable = useRecoilValue(editableState);
  const handleDeleteClick = () => {
    //정말 삭제하시겠습니까?
    setDetailDto({ ...detailDto, imgUrl: '' });
  };
  const handleUploadClick = () => {};
  return (
    <div className={styles.profileImgFrame}>
      <img
        className={styles.profileImg}
        src={detailDto.imgUrl ?? undefined}
        alt='profileImg'
      />
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
  );
}
