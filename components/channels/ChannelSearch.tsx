import { Dispatch, SetStateAction, FormEvent, ChangeEvent } from 'react';

import BasicButton from 'components/global/buttons/BasicButton';

import { IoIosSearch } from 'react-icons/io';

import styles from 'styles/channels/ChannelSearch.module.scss';

export default function ChannelSearch({
  onSubmit,
  keyword,
  setKeyword
}: {
  onSubmit: Dispatch<SetStateAction<string>>,
  keyword: string,
  setKeyword: Dispatch<SetStateAction<string>>
}) {
  const handleOnSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit(keyword);
    const newQuery = encodeURIComponent(keyword.trim());
  };

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <form className={styles.channelSearch} onSubmit={handleOnSubmit}>
      <input
        type='text'
        value={keyword}
        onChange={handleOnChange}
        placeholder='Search by channel title'
        style={{ background: 'transparent' }}
      />
      <BasicButton
        style={'short'}
        color={'opaque'}
        handleButtonClick={() => { }}
      >
        <IoIosSearch />
      </BasicButton>
    </form>
  );
}
