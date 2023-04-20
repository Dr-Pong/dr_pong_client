import { useTranslation } from 'react-i18next';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/pages/channels.module.scss';

export default function channels() {
  const { t } = useTranslation(['page']);
  return (
    <div className={styles.channelsPageContainer}>
      <PageHeader title={t('Channels')} button={null} />
    </div>
  );
}
