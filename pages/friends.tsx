import useTranslation from 'next-translate/useTranslation';

import PageHeader from 'components/global/PageHeader';

import styles from 'styles/friends/Friends.module.scss';

export default function friends() {
  const { t } = useTranslation('friends');
  return (
    <div className={styles.friendsPageContainer}>
      <PageHeader title={t('Friends')} button={null} />
    </div>
  );
}
