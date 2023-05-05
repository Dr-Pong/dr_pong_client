import useTranslation from 'next-translate/useTranslation';

import { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import LoginFilter from 'components/layouts/LoginFilter';
import NavigationLayout from 'components/layouts/NavigationLayout';
import SettingsFrame from 'components/settings/SettingsFrame';

import styles from 'styles/settings/Settings.module.scss';

export default function Settings() {
  const { t } = useTranslation('settings');

  return (
    <div className={styles.settingsPageContainer}>
      <PageHeader title={t('Settings')} button={null} />
      <SettingsFrame />
    </div>
  );
}

Settings.getLayout = function getLayout(page: ReactElement) {
  return (
    <LoginFilter>
      <NavigationLayout>{page}</NavigationLayout>
    </LoginFilter>
  );
};
