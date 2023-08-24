import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue } from 'recoil';

import React, { Dispatch, SetStateAction } from 'react';

import { editableState } from 'recoils/user';

import { Image } from 'types/userTypes';

import useModalProvider from 'hooks/useModalProvider';

import BasicButton from 'components/global/buttons/BasicButton';

import styles from 'styles/myPage/ProfileImage.module.scss';

type ProfileImageProps = {
  image: Image;
  setImage: Dispatch<SetStateAction<Image>>;
};

export default function ProfileImage({ image, setImage }: ProfileImageProps) {
  const { t } = useTranslation('myPage');
  const editable = useRecoilValue(editableState);
  const { useImageChangeModal } = useModalProvider();
  const handleSelectModalOpen = () => {
    useImageChangeModal(handleSubmitClick, image.id);
  };

  const handleSubmitClick = () => {
    const selectedRadio = document.querySelector(
      'input[type=radio][name=userImage]:checked'
    );
    const id = selectedRadio?.id ? parseInt(selectedRadio.id) : image.id;
    const selectedImg = document.querySelector(`label[for="${id}"] img`);
    const url = selectedImg?.getAttribute('src') ?? '';

    setImage({ id, url });
  };

  return (
    <div className={styles.profileImageContainer}>
      <img
        className={styles.profileImage}
        src={image.url ?? undefined}
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
