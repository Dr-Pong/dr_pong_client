import useTranslation from 'next-translate/useTranslation';

import { useState, useEffect, ReactElement } from 'react';

import useCustomQuery from 'hooks/useCustomQuery';

import PageHeader from 'components/global/PageHeader';
import LoginFilter from 'components/layouts/LoginFilter';
import NavigationLayout from 'components/layouts/NavigationLayout';
import ChannelSetting from 'components/channels/ChannelSetting';
import ChannelSearch from 'components/channels/ChannelSearch';
import ChannelsList from 'components/channels/ChannelsList';

import { AllChannels } from 'types/channelTypes';

import styles from 'styles/channels/Channels.module.scss';

export default function Channels() {
  const { t } = useTranslation('channels');
  const [channel, setChannel] = useState<AllChannels>();
  const [count, setCount] = useState(7);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');
  const { get } = useCustomQuery();
  const [url, setUrl] = useState<string>(`/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`);
  const { data, isLoading } = get(
    ['channels_key', url],
    url,
    setChannel
  );

  useEffect(() => {
    // fetch(`http://localhost:3000/api/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`)
    //   .then((res) => res.json())
    //   .then((data) => setChannel(data));
    setUrl(`/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`);
  }, [page, order, keyword]);

  useEffect(() => {
    setUrl(`/channels?page=${1}&count=${count}&order=${order}&keyword=${keyword}`);
  }, [keyword]);

  if (isLoading) return null;

  return (
    <div className={styles.channelsPageContainer}>
      <PageHeader title={t('Channels')} />
      <div className={styles.channelLayout}>
        <ChannelSetting
          order={order}
          setOrder={setOrder}
        />
        <ChannelSearch
          onSubmit={() => { }}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <ChannelsList
          channel={channel}
          page={page}
          setPage={setPage}
        />
      </div>
    </div>
  );
}

Channels.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <NavigationLayout>{page}</NavigationLayout>
    </LoginFilter>
  );
};
