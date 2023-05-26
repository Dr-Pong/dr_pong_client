import { useSetRecoilState } from 'recoil';

import { RiSendPlaneFill, RiSettings4Fill } from 'react-icons/ri';
import { TbBellFilled } from 'react-icons/tb';

import { sideBarState } from 'recoils/sideBar';

import useModalProvider from 'hooks/useModalProvider';

import SideBar from 'components/layouts/SideBar';

import styles from 'styles/layouts/Header.module.scss';

export default function Header() {
  const { useSettingsModal } = useModalProvider();
  const setSideBar = useSetRecoilState(sideBarState);

  return (
    <div>
      <SideBar />
      <div className={styles.headerContainer}>
        <RiSettings4Fill
          className={styles.headerIcon}
          onClick={useSettingsModal}
        />
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
      </div>
    </div>
  );
}
