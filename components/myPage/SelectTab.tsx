import React from 'react';

import ItemsGrid from 'components/myPage/ItemsGrid';
import SelectedItems from 'components/myPage/SelectedItems';

import styles from 'styles/myPage/SelectTab.module.scss';

export default function SelectTab({
  userName,
  onWhichTab,
}: {
  userName: string;
  onWhichTab: string;
}) {
  return (
    <div className={styles.selectTab}>
      <SelectedItems userName={userName} itemType={onWhichTab} />
      <ItemsGrid userName={userName} itemType={onWhichTab} />
    </div>
  );
}
