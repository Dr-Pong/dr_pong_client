import { useState, useCallback, Dispatch, SetStateAction, FormEvent, ChangeEvent } from 'react';

import ChannelDropdown from 'components/channels/ChannelDropdown';

import useModalProvider from 'hooks/useModalProvider';

import styles from 'styles/channels/ChannelSetting.module.scss';
import { IoIosAdd, IoIosSearch } from 'react-icons/io';

import BasicButton from 'components/global/buttons/BasicButton';

export default function ChannelSetting({
  order,
  setOrder,
  setKeyword
}: {
  order: string,
  setOrder: Dispatch<SetStateAction<string>>,
  setKeyword: Dispatch<SetStateAction<string>>
}) {
  const { useCreateChannelModal } = useModalProvider();
  const [channelTitle, setChannelTitle] = useState<string>('');
  const handleKeywordSubmit = useCallback((event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setKeyword(channelTitle);
  }, [channelTitle]);

  const handleKeywordChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    setChannelTitle(event.target.value);
  }, [channelTitle]);

  return (
    <div className={styles.channelSetting}>
      <form className={styles.channelSearch} onSubmit={handleKeywordSubmit}>
        <input
          className={styles.input}
          type='text'
          value={channelTitle}
          onChange={handleKeywordChange}
          placeholder='Search channel'
        />
        <BasicButton
          style={'small'}
          color={'opaque'}
          handleButtonClick={handleKeywordSubmit}
        >
          <IoIosSearch />
        </BasicButton>
      </form>
      <BasicButton
        style={'small'}
        color={'opaque'}
        handleButtonClick={useCreateChannelModal}
      >
        <IoIosAdd />
      </BasicButton>
      <ChannelDropdown
        order={order}
        setOrder={setOrder}
      />
    </div>
  );
}
