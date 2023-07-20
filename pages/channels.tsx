import useTranslation from 'next-translate/useTranslation';

import React, { ReactElement } from 'react';

import ChannelsFrame from 'components/channels/ChannelsFrame';
import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';

import styles from 'styles/channels/Channels.module.scss';

export default function Channels() {
  const { t } = useTranslation('channels');

  return (
    <div className={styles.channelsPageContainer}>
      <PageHeader title={t('Channels')} />
      <ChannelsFrame />
    </div>
  );
}

Channels.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
