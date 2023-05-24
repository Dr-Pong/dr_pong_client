import { RiSendPlaneFill, RiSettings4Fill } from 'react-icons/ri';
import { TbBellFilled } from 'react-icons/tb';

import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/layouts/Header.module.scss';

export default function Header() {
  const { useSettingsModal } = useModalProvider();

  return (
    <div className={styles.headerContainer}>
      <RiSettings4Fill
        className={styles.headerIcon}
        onClick={useSettingsModal}
      />
      <div>
        <RiSendPlaneFill className={styles.headerIcon} />
        <TbBellFilled className={styles.headerIcon} />
      </div>
    </div>
  );
}
