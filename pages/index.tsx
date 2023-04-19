import { useRecoilState } from 'recoil';

import React from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';

import ButtonRow from 'components/global/buttons/ButtonRow';
import CancelButton from 'components/global/buttons/CancelButton';
import SubmitButton from 'components/global/buttons/SubmitButton';
import Footer from 'components/layouts/Footer';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import ModalTitle from 'components/modals/modalParts/ModalTitle';

import '../i18n';

export default function Home() {
  const [openModal, setOpenModal] = useRecoilState(openModalState);
  const [modalParts, setModalParts] = useRecoilState(modalPartsState);
  const handleProfileSubmit = () => {};
  const buttonList: React.ReactNode[] = [
    <CancelButton
      style='basic'
      color='white'
      value='취소'
      handleButtonClick={null}
    />,
    <SubmitButton
      style='basic'
      color='black'
      value='저장'
      handleButtonClick={handleProfileSubmit}
    />,
  ];

  const handleButtonClick = () => {
    setModalParts({
      ...modalParts,
      // head: <ModalTitle title='modal' />,
      head: null,
      body: (
        <ModalPhrase
          phrase={
            '페이지를 나가면 변경 사항을 잃게 됩니다.\n수정 내역을 저장하시겠습니까?'
          }
        />
      ),
      tail: null,
      // tail: <ButtonRow buttonList={buttonList} />,
    });
    setOpenModal(true);
  };
  return (
    <div>
      <button type='button' onClick={handleButtonClick}>
        modal
      </button>
      <Footer />
    </div>
  );
}
