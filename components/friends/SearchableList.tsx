import React, { useState } from 'react';

import styles from 'styles/friends/SearchableList.module.scss';

export default function SearchableList({ units }: { units: JSX.Element[] }) {
  const [searchKey, setSearchKey] = useState<string>('');

  return (
    <div className={styles.searchableList}>
      <div className={styles.searchBar}>
        <input
          type='text'
          value={searchKey}
          onChange={(e) => setSearchKey(e.target.value)}
          placeholder={'Search by nickname'}
        />
      </div>
      <div className={styles.list}>
        {units.filter((u) => u.props.friend.nickname.includes(searchKey))}
      </div>
    </div>
  );
}
