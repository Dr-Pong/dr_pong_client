import useTranslation from 'next-translate/useTranslation';
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from 'recoil';

import React, { useEffect } from 'react';

import { modalPartsState, openModalState } from 'recoils/modal';
import { editableState, tabState, userState } from 'recoils/user';

import BasicButton from 'components/global/buttons/BasicButton';
import ModalButton from 'components/global/buttons/CloseModalButton';
import ModalPhrase from 'components/modals/modalParts/ModalPhrase';
import Profile from 'components/myPage/Profile';
import SelectTab from 'components/myPage/SelectTab';

import styles from 'styles/MyPage/MyPageFrame.module.scss';

export default function MyPageFrame() {
  const { t } = useTranslation('myPage');
  const [tab, setTab] = useRecoilState(tabState);
  const [editable, setEditable] = useRecoilState(editableState);
  const user = useRecoilValue(userState);
  const setModalParts = useSetRecoilState(modalPartsState);
  const resetModalParts = useResetRecoilState(modalPartsState);
  const setOpenModal = useSetRecoilState(openModalState);
  const { nickname } = user;
  useEffect(() => {
    return () => {
      setEditable(false);
    };
  }, []);
  const handleEditButtonClick = () => {
    setEditable(!editable);
  };
  const warnBeforeMovingWhenEditable = (callback?: () => void) => {
    setModalParts({
      head: null,
      body: <ModalPhrase>{'변경 사항 날라가는디 갠찬??..'}</ModalPhrase>,
      tail: (
        <div style={{ display: 'flex' }}>
          <BasicButton
            style={'basic'}
            color={'black'}
            handleButtonClick={() => {
              setEditable(false);
              resetModalParts();
              setOpenModal(false);
              callback?.();
            }}
          >
            {'갠찬'}
          </BasicButton>
          <ModalButton style={'basic'} color={'black'}>
            {'안갠찬..'}
          </ModalButton>
        </div>
      ),
    });
    setOpenModal(true);
  };
  const handleTabClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (tab === event.currentTarget.id) return;
    if (editable)
      warnBeforeMovingWhenEditable(() => {
        setTab(event.currentTarget.id);
      });
    else setTab(event.currentTarget.id);
  };

  const tabs: { [key: string]: JSX.Element } = {
    profile: <Profile userName={nickname} key={'profile'} />,
    achieve: (
      <SelectTab userName={nickname} itemType={'achieve'} key={'achieve'} />
    ),
    emoji: <SelectTab userName={nickname} itemType={'emoji'} key={'emoji'} />,
  };

  return (
    <div className={styles.myPageFrame}>
      <div className={styles.editButtonContainer}>
        <div className={styles.editButton} onClick={handleEditButtonClick}>
          {editable ? t('save') : t('edit')}
        </div>
      </div>
      <div className={styles.goToContainer}>
        {Object.keys(tabs).map((tabName) => {
          return (
            <div
              id={tabName}
              key={tabName}
              className={styles.goTo}
              onClick={handleTabClick}
            >
              {t(tabName)}
            </div>
          );
        })}
      </div>
      <div className={styles.tabContainer}>{tabs[tab]}</div>
    </div>
  );
}
