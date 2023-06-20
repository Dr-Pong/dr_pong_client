import { useRecoilValue, useSetRecoilState } from 'recoil';

import { RiSendPlaneFill, RiSettings4Fill } from 'react-icons/ri';
import { TbBellFilled } from 'react-icons/tb';

import { sideBarState } from 'recoils/sideBar';
import { userState } from 'recoils/user';

import useModalProvider from 'hooks/useModalProvider';

import SideBar from 'components/layouts/SideBar';

import styles from 'styles/layouts/Header.module.scss';

export default function Header() {
  const { useSettingsModal } = useModalProvider();
  const { roleType } = useRecoilValue(userState);
  const setSideBar = useSetRecoilState(sideBarState);

  return (
    <div>
      <SideBar />
      <div className={styles.headerContainer}>
        <RiSettings4Fill
          className={styles.headerIcon}
          onClick={useSettingsModal}
        />
        {roleType === 'member' && (
          <div>
            <RiSendPlaneFill
              className={styles.headerIcon}
              onClick={() => {
                setSideBar('directMessage');
              }}
            />
            <TbBellFilled
              className={styles.headerIcon}
              onClick={() => {
                setSideBar('notification');
              }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
