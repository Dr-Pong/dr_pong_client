import { useState, useEffect } from 'react';

import ChannelSetting from './ChannelSetting';
import ChannelSearch from './ChannelSearch';
import ChannelsList from './ChannelsList';

import { AllChannels } from 'types/channelTypes';

import styles from 'styles/channels/Channels.module.scss';

export default function ChannelsFrame() {
  const [channel, setChannel] = useState<AllChannels>();
  const [count, setCount] = useState(7);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');

  useEffect(() => {
    fetch(`http://localhost:3000/api/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`)
      .then((res) => res.json())
      .then((data) => setChannel(data));
  }, [page]);

  return (
    <div className={styles.channelLayout}>
      <ChannelSetting
        setOrder={setOrder}
      />
      <ChannelSearch
        onSubmit={() => { }}
        keyword={keyword}
        setKeyword={setKeyword}
      />
      <ChannelsList channel={channel} page={page} setPage={setPage} />
    </div>
  );
}
