import React from 'react';

import styles from 'styles/myPage/SelectTab.module.scss';

import ItemsGrid from './ItemsGrid';
import SelectedItems from './SelectedItems';

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
