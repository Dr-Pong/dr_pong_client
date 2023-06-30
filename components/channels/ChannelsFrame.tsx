import { useEffect, useState } from 'react';

import { Channel, ChannelList } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import ChannelBox from 'components/channels/ChannelBox';
import ChannelFilter from 'components/channels/ChannelFilter';
import MyChannel from 'components/channels/MyChannel';
import ErrorRefresher from 'components/global/ErrorRefresher';
import LoadingSpinner from 'components/global/LoadingSpinner';
import Pagination from 'components/global/Pagination';

import styles from 'styles/channels/ChannelsFrame.module.scss';

export default function ChannelsFrame() {
  const [{ channels, currentPage, totalPage }, setChannelList] =
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
  const channelListGet = get(['allChannels', url], url, setChannelList);

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

  if (channelListGet.isLoading || myChannelGet.isLoading)
    return <LoadingSpinner />;
  if (channelListGet.isError)
    return <ErrorRefresher error={channelListGet.error} />;
  if (myChannelGet.isError)
    return <ErrorRefresher error={myChannelGet.error} />;

  return (
    <div className={styles.channelsFrameContainer}>
      {myChannelGet.data.myChannel && (
        <MyChannel channel={myChannelGet.data.myChannel} />
      )}
      <div className={styles.settingChannelListWrap}>
        <ChannelFilter
          order={order}
          setOrder={setOrder}
          setKeyword={setKeyword}
          haveMyChannel={!!myChannelGet.data.myChannel}
        />
        <div className={styles.channelList}>
          {channels.map((eachChannel: Channel) => {
            return (
              <ChannelBox
                channel={eachChannel}
                isMyChannel={eachChannel.id === myChannelGet.data.myChannel?.id}
                haveMyChannel={!!myChannelGet.data.myChannel}
              />
            );
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
