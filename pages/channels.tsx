import useTranslation from 'next-translate/useTranslation';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/channels/Channels.module.scss';

export default function Channels() {
  const { t } = useTranslation('channels');
  return (
    <div className={styles.channelsPageContainer}>
      <PageHeader title={t('Channels')} button={null} />
    </div>
  );
}
