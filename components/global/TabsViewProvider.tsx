import useTranslation from 'next-translate/useTranslation';

import React from 'react';

import styles from 'styles/global/TabsViewProvider.module.scss';

export default function TabsViewProvider({
  namespace,
  tabNames,
  handleTabClick,
  children,
}: {
  namespace: string;
  tabNames: string[];
  handleTabClick: (event: React.MouseEvent<HTMLDivElement>) => void;
  children: React.ReactNode;
}) {
  const { t } = useTranslation(namespace);
  return (
    <div className={styles.tabsViewProvider}>
      <div className={styles.tabNames}>
        {tabNames.map((name) => {
          return (
            <div
              id={name}
              key={name}
              className={styles.tabName}
              onClick={handleTabClick}
            >
              {t(name)}
            </div>
          );
        })}
      </div>
      <div className={styles.tab}>{children}</div>
    </div>
  );
}
