import React, { Dispatch, SetStateAction } from 'react';

import styles from 'styles/friends/SearchBar.module.scss';

type SearchableListProps = {
  searchKey: string;
  setSearchKey: Dispatch<SetStateAction<string>>;
  placeHolder: string;
  handleOnSubmit?: (event: React.FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
  searchKey,
  setSearchKey,
  placeHolder,
  handleOnSubmit,
}: SearchableListProps) {
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        type='text'
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder={placeHolder}
        className={styles.searchBar}
      />
    </form>
  );
}
