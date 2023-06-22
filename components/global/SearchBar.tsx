import React, { Dispatch, FormEvent, SetStateAction } from 'react';

import styles from 'styles/global/SearchBar.module.scss';

type SearchableListProps = {
  inputId: string;
  searchKey: string;
  setSearchKey: Dispatch<SetStateAction<string>>;
  placeHolder: string;
  handleOnSubmit?: (event: FormEvent<HTMLFormElement>) => void;
};

export default function SearchBar({
  inputId,
  searchKey,
  setSearchKey,
  placeHolder,
  handleOnSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  },
}: SearchableListProps) {
  return (
    <form onSubmit={handleOnSubmit}>
      <input
        id={inputId}
        type='text'
        value={searchKey}
        onChange={(e) => setSearchKey(e.target.value)}
        placeholder={placeHolder}
        className={styles.searchBar}
      />
    </form>
  );
}
