import { useState, Dispatch, SetStateAction, FormEvent, ChangeEvent } from 'react';

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
  const [channelTitle, setChannelTitle] = useState<string>('');
  const handleKeywordSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(channelTitle);
    onSubmit(keyword);
  };

  const handleKeywordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChannelTitle(event.target.value);
  };

  return (
    <form className={styles.channelSearch} onSubmit={handleKeywordSubmit}>
      <input
        type='text'
        value={channelTitle}
        onChange={handleKeywordChange}
        placeholder='Search by channel title'
        style={{
          color: 'white',
          background: 'transparent'
        }}
      />
      <BasicButton
        style={'short'}
        color={'opaque'}
        handleButtonClick={handleKeywordSubmit}
      >
        <IoIosSearch />
      </BasicButton>
    </form>
  );
}
