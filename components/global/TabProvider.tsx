import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import styles from 'styles/global/TabProvider.module.scss';

type TabProviderProps = {
  namespace: string;
  tabNames: string[];
  currentTab: string;
  handleTabClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
};

export default function TabProvider({
  namespace,
  tabNames,
  currentTab,
  handleTabClick,
  children,
}: TabProviderProps) {
  const { t } = useTranslation(namespace);
  return (
    <div className={styles.tabProviderContainer}>
      <div className={styles.tabButtonsWrap}>
        {tabNames.map((name) => {
          return (
            <div
              id={name}
              key={name}
              className={`${styles.tabButton} ${
                currentTab === name && styles.currentTabButton
              }`}
              onClick={handleTabClick}
            >
              {t(name)}
            </div>
          );
        })}
      </div>
      <div className={styles.tabBox}>{children}</div>
    </div>
  );
}
