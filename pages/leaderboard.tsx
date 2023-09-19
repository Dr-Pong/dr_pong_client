import useTranslation from 'next-translate/useTranslation';

import React, { ReactElement } from 'react';
import { BsQuestionSquare } from 'react-icons/bs';

import useModalProvider from 'hooks/useModalProvider';

import PageHeader from 'components/global/PageHeader';
import AppLayout from 'components/layouts/AppLayout';
import Footer from 'components/layouts/Footer';
import LeaderboardFrame from 'components/leaderboard/LeaderboardFrame';
import SeasonTitle from 'components/leaderboard/SeasonTitle';

import styles from 'styles/leaderboard/Leaderboard.module.scss';

export default function Leaderboard() {
  const { t } = useTranslation('leaderboard');
  const { useSeasonGuideModal } = useModalProvider();

  const headerButtons = [
    {
      value: <BsQuestionSquare />,
      handleButtonClick: useSeasonGuideModal,
    },
  ];

  return (
    <div className={styles.leaderboardPageContainer}>
      <PageHeader title={t('Leaderboard')} buttons={headerButtons} />
      <SeasonTitle />
      <LeaderboardFrame />
      <Footer />
    </div>
  );
}

Leaderboard.getLayout = function getLayout(page: ReactElement) {
  return <AppLayout>{page}</AppLayout>;
};
