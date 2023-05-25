import { useState } from 'react';
import { RiSendPlaneFill, RiSettings4Fill } from 'react-icons/ri';
import { TbBellFilled } from 'react-icons/tb';

import useModalProvider from 'hooks/useModalProvider';

import SideBar from 'components/layouts/SideBar';

import styles from 'styles/layouts/Header.module.scss';

export default function Header() {
  const { useSettingsModal } = useModalProvider();
  const [sideBarType, setSideBarType] = useState<string | null>(null);

  return (
    <div>
      <SideBar type={sideBarType} setType={setSideBarType} />
      <div className={styles.headerContainer}>
        <RiSettings4Fill
          className={styles.headerIcon}
          onClick={useSettingsModal}
        />
        <div>
          <RiSendPlaneFill
            className={styles.headerIcon}
            onClick={() => {
              setSideBarType('messages');
            }}
          />
          <TbBellFilled
            className={styles.headerIcon}
            onClick={() => {
              setSideBarType('notifications');
            }}
          />
        </div>
      </div>
    </div>
  );
}
