import useTranslation from 'next-translate/useTranslation';

import { ReactElement, useEffect, useState } from 'react';

import { AllChannels, IsMyChannel } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import PageHeader from 'components/global/PageHeader';
import LoginFilter from 'components/layouts/LoginFilter';
import ChannelSetting from 'components/channels/ChannelSetting';
import ChannelsList from 'components/channels/ChannelsList';
import MyChannel from 'components/channels/MyChannel';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/channels/Channels.module.scss';

export default function Channels() {
  const { t } = useTranslation('channels');
  const [channels, setChannels] = useState<AllChannels>();
  const [myChannel, setMyChannel] = useState<IsMyChannel>(null);
  const [count, setCount] = useState(7);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');
  const { get } = useCustomQuery();
  const [url, setUrl] = useState<string>(`/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`);
  const myChannelGet = get('myChannel', '/channels/me', setMyChannel);
  const allChannelGet = get(['allChannels', url], url, setChannels);

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

  if (allChannelGet.isLoading || allChannelGet.isError) return null;
  if (myChannelGet.isLoading || myChannelGet.isError) return null;

  return (
    <div className={styles.channelsPageContainer}>
      <PageHeader title={t('Channels')} />
      <div>
        {myChannel && <MyChannel channel={myChannelGet.data} />}
        <ChannelSetting
          order={order}
          setOrder={setOrder}
          setKeyword={setKeyword}
        />
        <ChannelsList channels={channels} page={page} setPage={setPage} />
      </div>
    </div>
  );
}

Channels.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <AppLayout>{page}</AppLayout>
    </LoginFilter>
  );
};
