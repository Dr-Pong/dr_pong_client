import { useTranslation } from 'react-i18next';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/pages/settings.module.scss';

export default function settings() {
  const { t } = useTranslation(['page']);
  return (
    <div className={styles.settingsPageContainer}>
      <PageHeader title={t('Settings')} button={null} />
    </div>
  );
}
