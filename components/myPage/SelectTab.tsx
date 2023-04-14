import React from 'react';

import styles from 'styles/myPage/SelectTab.module.scss';

import ItemsGrid from './ItemsGrid';
import { EditableStatus, MyPageTab } from './MyPageFrame';
import SelectedItems from './SelectedItems';

export default function SelectTab({ onWhichTab }: { onWhichTab: MyPageTab }) {
  const itemType = () => {
    if (onWhichTab == MyPageTab.ACHIEVE) {
      return 'achieve';
    } else {
      return 'emoji';
    }
  };
  return (
    <div className={styles.selectTab}>
      <SelectedItems itemType={itemType()} />
      <ItemsGrid itemType={itemType()} />
    </div>
  );
}
