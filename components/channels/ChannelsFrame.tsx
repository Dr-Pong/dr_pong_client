import { useEffect, useState } from 'react';

import { Channel, ChannelList } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import ChannelBox from 'components/channels/ChannelBox';
import ChannelFilter from 'components/channels/ChannelFilter';
import MyChannel from 'components/channels/MyChannel';
import Pagination from 'components/global/Pagination';
import LoadingSpinner from 'components/global/LoadingSpinner';
import ErrorRefresher from 'components/global/ErrorRefresher';

import styles from 'styles/channels/ChannelsFrame.module.scss';

export default function ChannelsFrame() {
  const [{ channels, currentPage, totalPage }, setChennelList] =
    useState<ChannelList>(defaultChannelList);
  const [count, setCount] = useState(10);
  const [page, setPage] = useState(currentPage);
  const [order, setOrder] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');
  const [url, setUrl] = useState<string>(
    `/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`
  );
  const { get } = useCustomQuery();
  const myChannelGet = get('myChannel', '/channels/me');
  const channelListGet = get(['allChannels', url], url, setChennelList);

  useEffect(() => {
    setUrl(
      `/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`
    );
  }, [page, order, count]);

  useEffect(() => {
    setUrl(
      `/channels?page=${1}&count=${count}&order=${order}&keyword=${keyword}`
    );
  }, [keyword]);

  if (channelListGet.isLoading || myChannelGet.isLoading) return <LoadingSpinner />;
  if (channelListGet.isError || myChannelGet.isError) return <ErrorRefresher />;

  return (
    <div className={styles.channelsFrameContainer}>
      {myChannelGet.data && <MyChannel channel={myChannelGet.data} />}
      <div className={styles.settingChannelListWrap}>
        <ChannelFilter
          order={order}
          setOrder={setOrder}
          setKeyword={setKeyword}
        />
        <div className={styles.channelList}>
          {channels.map((eachChannel: Channel) => {
            return <ChannelBox channel={eachChannel} />;
          })}
        </div>
      </div>
      <Pagination total={totalPage} page={page} setPage={setPage} />
    </div>
  );
}

const defaultChannelList = {
  channels: [],
  currentPage: 1,
  totalPage: 1,
};
