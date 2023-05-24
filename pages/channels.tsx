import useTranslation from 'next-translate/useTranslation';

import { ReactElement, useEffect, useState } from 'react';

import { AllChannels } from 'types/channelTypes';

import useCustomQuery from 'hooks/useCustomQuery';

import ChannelSearch from 'components/channels/ChannelSearch';
import ChannelSetting from 'components/channels/ChannelSetting';
import ChannelsList from 'components/channels/ChannelsList';
import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';
import LoginFilter from 'components/layouts/LoginFilter';

import styles from 'styles/channels/Channels.module.scss';

export default function Channels() {
  const { t } = useTranslation('channels');
  const [channel, setChannel] = useState<AllChannels>();
  const [count, setCount] = useState(7);
  const [page, setPage] = useState(1);
  const [order, setOrder] = useState<string>('recent');
  const [keyword, setKeyword] = useState<string>('');
  const { get, queryClient } = useCustomQuery();
  const [url, setUrl] = useState<string>(
    `/channels?page=${page}&count=${count}&order=${order}&keyword=${keyword}`
  );
  const { data, isLoading } = get(['channels_key', url], url, setChannel);

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

  if (isLoading) return null;

  return (
    <div className={styles.channelsPageContainer}>
      <PageHeader title={t('Channels')} />
      <div className={styles.channelLayout}>
        <ChannelSetting
          order={order}
          setOrder={setOrder}
          queryClient={queryClient}
        />
        <ChannelSearch
          onSubmit={() => {}}
          keyword={keyword}
          setKeyword={setKeyword}
        />
        <ChannelsList channel={channel} page={page} setPage={setPage} />
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
