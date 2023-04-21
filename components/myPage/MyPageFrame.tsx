import { useRecoilState } from 'recoil';

import React from 'react';
import { useTranslation } from 'react-i18next';
import { useQuery } from 'react-query';

import { editableState, tabState } from 'recoils/myPage';

import { User } from 'types/myPageTypes';

import instance from 'utils/axios';

import Profile from 'components/myPage/Profile';
import SelectTab from 'components/myPage/SelectTab';

import styles from 'styles/MyPage/MyPageFrame.module.scss';

export default function MyPageFrame() {
  const { t } = useTranslation(['page']);
  const [tab, setTab] = useRecoilState(tabState);
  const [editable, setEditable] = useRecoilState(editableState);
  const fetchUser = async (): Promise<User> => {
    const res = await instance.get(`/users/me`);
    return res.data;
  };
  const { data, isLoading, isError } = useQuery('user', fetchUser); // 추후 리코일 스테이트로 변경
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error...</div>;
  const { nickname } = data as User;
  const handleEditButtonClick = () => {
    setEditable(!editable);
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
              key={tabName}
              className={styles.goTo}
              onClick={() => {
                setTab(tabName);
              }}
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

// const initVal: User = {
//   nickname: '',
//   imgUrl: '',
// };
