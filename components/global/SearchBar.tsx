import { useRouter } from 'next/router';

import React, { useState } from 'react';

import styles from 'styles/global/SearchBar.module.scss';

export default function SearchBar({
  onSubmit,
  initValue,
}: {
  onSubmit: React.Dispatch<React.SetStateAction<string>>;
  initValue: string;
}) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState(initValue);

  const handleOnSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(searchQuery);
    const newQuery = encodeURIComponent(searchQuery.trim());
    router.push(`/records/${newQuery}/`);
  };

  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <form className={styles.searchBar} onSubmit={handleOnSubmit}>
      <input
        type='text'
        value={searchQuery}
        onChange={handleOnChange}
        placeholder={'Search by nickname'}
      />
      <button type='submit'>{'Search'}</button>
    </form>
  );
}
