import useTranslation from 'next-translate/useTranslation';

import { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import LoginFilter from 'components/layouts/LoginFilter';
import NavigationLayout from 'components/layouts/NavigationLayout';
import ChannelsFrame from 'components/channels/ChannelsFrame';

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
  return (
    <LoginFilter>
      <NavigationLayout>{page}</NavigationLayout>
    </LoginFilter>
  );
};
