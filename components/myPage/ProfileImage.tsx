import useTranslation from 'next-translate/useTranslation';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';

import React from 'react';
import { IoIosClose } from 'react-icons/io';

import { editableState } from 'recoils/user';

import { DetailDto } from 'components/myPage/ProfileCard';

import styles from 'styles/myPage/ProfileImage.module.scss';

import { modalPartsState, openModalState } from '../../recoils/modal';
import BasicButton from '../global/buttons/BasicButton';
import ModalButton from '../global/buttons/CloseModalButton';
import ModalPhrase from '../modals/modalParts/ModalPhrase';
import UserImage from '../signUp/UserImage';

export default function ProfileImage({
  detailDto,
  setDetailDto,
}: {
  detailDto: DetailDto;
  setDetailDto: React.Dispatch<React.SetStateAction<DetailDto>>;
}) {
  const { t } = useTranslation('myPage');
  const editable = useRecoilValue(editableState);
  const setModalParts = useSetRecoilState(modalPartsState);
  const resetModalParts = useResetRecoilState(modalPartsState);
  const setOpenModal = useSetRecoilState(openModalState);
  const { id: originId, url: imgUrl } = detailDto.image;
  const handleChangeClick = () => {
    const handleSubmitClick = () => {
      const selectedRadio = document.querySelector(
        'input[type=radio][name=userImage]:checked'
      );
      const imgId = selectedRadio?.id ? parseInt(selectedRadio.id) : 0;
      const selectedImg = document.querySelector(`label[for="${imgId}"] img`);
      const url = selectedImg?.getAttribute('src') ?? '';
      setDetailDto((prevDetailDto) => ({
        ...prevDetailDto,
        image: {
          id: imgId ?? originId,
          url: url,
        },
      }));
      resetModalParts();
      setOpenModal(false);
    };

    setModalParts({
      head: null,
      body: (
        <ModalPhrase>
          <UserImage selectedId={originId} />
        </ModalPhrase>
      ),
      tail: (
        <div style={{ display: 'flex' }}>
          <BasicButton
            style={'basic'}
            color={'black'}
            handleButtonClick={handleSubmitClick}
          >
            {'바꾸'}
          </BasicButton>
          <ModalButton style={'basic'} color={'black'}>
            {'안바꾸..'}
          </ModalButton>
        </div>
      ),
    });
    setOpenModal(true);
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
