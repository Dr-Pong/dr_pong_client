import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React from 'react';

import { editableState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';

import { DetailDto } from 'components/myPage/profile/ProfileCard';

import styles from 'styles/myPage/ProfileImage.module.scss';

export default function ProfileImage({
  detailDto,
  setDetailDto,
}: {
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
}) {
  const { t } = useTranslation('myPage');
  const editable = useRecoilValue(editableState);
  const { id: originId, url: imgUrl } = detailDto.image;
  const { useImageChangeModal } = useModalProvider();
  const handleChangeClick = () => {
    useImageChangeModal(handleSubmitClick, originId);
  };
  const handleSubmitClick = () => {
    const selectedRadio = document.querySelector(
      'input[type=radio][name=userImage]:checked'
    );
    const imgId = selectedRadio?.id ? parseInt(selectedRadio.id) : originId;
    const selectedImg = document.querySelector(`label[for="${imgId}"] img`);
    const url = selectedImg?.getAttribute('src') ?? '';
    setDetailDto((prevDetailDto) => ({
      ...prevDetailDto,
      image: {
        id: imgId,
        url: url,
      },
    }));
  };
  return (
    <div className={styles.profileImgFrame}>
      <img
        className={styles.profileImg}
        src={imgUrl ?? undefined}
        alt='profileImg'
      />
      {editable && (
        <div className={styles.imgOverlay}>
          <div className={styles.changeButton} onClick={handleChangeClick}>
            {t('change picture')}
          </div>
        </div>
      )}
    </div>
  );
}
