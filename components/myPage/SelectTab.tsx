import React from 'react';

import styles from 'styles/myPage/SelectTab.module.scss';

import ItemsGrid from './ItemsGrid';
import SelectedItems from './SelectedItems';

export default function SelectTab({ onWhichTab }: { onWhichTab: string }) {
  return (
    <div className={styles.selectTab}>
      <SelectedItems itemType={onWhichTab} />
      <ItemsGrid itemType={onWhichTab} />
    </div>
  );
}
