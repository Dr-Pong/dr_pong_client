import { useTranslation } from 'react-i18next';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/pages/friends.module.scss';

export default function friends() {
  const { t } = useTranslation(['page']);
  return (
    <div className={styles.friendsPageContainer}>
      <PageHeader title={t('Friends')} button={null} />
    </div>
  );
}
