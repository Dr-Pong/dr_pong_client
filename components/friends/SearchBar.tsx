import React, { Dispatch, SetStateAction } from 'react';

import styles from 'styles/friends/SearchBar.module.scss';

type SearchableListProps = {
  searchKey: string;
  setSearchKey: Dispatch<SetStateAction<string>>;
  placeHolder: string;
};

export default function SearchBar({
  searchKey,
  setSearchKey,
  placeHolder,
}: SearchableListProps) {
  return (
    <input
      type='text'
      value={searchKey}
      onChange={(e) => setSearchKey(e.target.value)}
      placeholder={placeHolder}
      className={styles.searchBar}
    />
  );
}
