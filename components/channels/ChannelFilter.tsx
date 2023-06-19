import useTranslation from 'next-translate/useTranslation';

import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useCallback,
  useState,
} from 'react';
import { IoMdAdd } from 'react-icons/io';
import { IoSearch } from 'react-icons/io5';

import useModalProvider from 'hooks/useModalProvider';

import ChannelSortDropdown from 'components/channels/ChannelSortDropdown';
import SearchBar from 'components/global/SearchBar';
import BasicButton from 'components/global/buttons/BasicButton';
import SubmitButton from 'components/global/buttons/SubmitButton';

import styles from 'styles/channels/ChannelsFrame.module.scss';

type ChannelFilterProps = {
  order: string;
  setOrder: Dispatch<SetStateAction<string>>;
  setKeyword: Dispatch<SetStateAction<string>>;
  haveMyChannel: boolean;
};

export default function ChannelFilter({
  order,
  setOrder,
  setKeyword,
  haveMyChannel
}: ChannelFilterProps) {
  const { t } = useTranslation('channels');
  const { useChannelCreateModal } = useModalProvider();
  const [channelTitle, setChannelTitle] = useState<string>('');

  const handleKeywordSubmit = useCallback(
    (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setKeyword(channelTitle);
    },
    [channelTitle]
  );

  const handleChannelCreate = () => {
    useChannelCreateModal(haveMyChannel);
  }

  return (
    <div className={styles.channelFilterContainer}>
      <ChannelSortDropdown order={order} setOrder={setOrder} />
      <div className={styles.rightWrap}>
        <SearchBar
          searchKey={channelTitle}
          setSearchKey={setChannelTitle}
          placeHolder={t('channel name')}
          handleOnSubmit={handleKeywordSubmit}
        />
        <SubmitButton
          style='square'
          color='pink'
          handleButtonClick={handleKeywordSubmit}
        >
          <IoSearch />
        </SubmitButton>
        <BasicButton
          style={'square'}
          color={'pink'}
          handleButtonClick={handleChannelCreate}
        >
          <IoMdAdd />
        </BasicButton>
      </div>
    </div>
  );
}
