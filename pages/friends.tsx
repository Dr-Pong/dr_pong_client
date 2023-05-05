import useTranslation from 'next-translate/useTranslation';

import { ReactElement } from 'react';

import PageHeader from 'components/global/PageHeader';
import NavigationLayout from 'components/layouts/NavigationLayout';

import styles from 'styles/friends/Friends.module.scss';

export default function Friends() {
  const { t } = useTranslation('friends');
  return (
    <div className={styles.friendsPageContainer}>
      <PageHeader title={t('Friends')} button={null} />
    </div>
  );
}

Friends.getLayout = function getLayout(page: ReactElement) {
  return <NavigationLayout>{page}</NavigationLayout>;
};
