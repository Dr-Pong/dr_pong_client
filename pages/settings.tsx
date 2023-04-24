import useTranslation from 'next-translate/useTranslation';

import PageHeader from 'components/global/PageHeader';
import SettingsFrame from 'components/settings/SettingsFrame';

import styles from 'styles/settings/Settings.module.scss';

export default function settings() {
  const { t } = useTranslation('settings');

  return (
    <div className={styles.settingsPageContainer}>
      <PageHeader title={t('Settings')} button={null} />
      <SettingsFrame />
    </div>
  );
}
