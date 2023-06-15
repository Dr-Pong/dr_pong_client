import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { Dispatch, SetStateAction } from 'react';

import { editableState } from 'recoils/user';

import { DetailDto } from 'types/userTypes';

import useModalProvider from 'hooks/useModalProvider';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/myPage/ProfileImage.module.scss';

export default function ProfileImage({
  detailDto,
  setDetailDto,
}: {
  detailDto: DetailDto;
  setDetailDto: Dispatch<SetStateAction<DetailDto>>;
}) {
  const { t } = useTranslation('myPage');
  const editable = useRecoilValue(editableState);
  const { id: originId, url: imgUrl } = detailDto.image;
  const { useImageChangeModal } = useModalProvider();
  const handleSelectModalOpen = () => {
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
    <div className={styles.profileImageContainer}>
      <img
        className={styles.profileImage}
        src={imgUrl ?? undefined}
        alt='profileImg'
      />
      {editable && (
        <BasicButton
          style='thin'
          color='pink'
          handleButtonClick={handleSelectModalOpen}
        >
          {t('select')}
        </BasicButton>
      )}
    </div>
  );
}
