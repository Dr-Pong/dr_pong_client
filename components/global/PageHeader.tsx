import React from 'react';

import styles from 'styles/global/PageHeader.module.scss';

type pageHeaderProps = {
  title: string;
  buttons?: {
    value: React.ReactNode;
    handleButtonClick: () => void;
  }[];
};

export default function PageHeader({ title, buttons }: pageHeaderProps) {
  return (
    <div className={styles.pageHeaderContainer}>
      <span className={styles.title}>{title}</span>
      {buttons && (
        <div className={styles.buttons}>
          {buttons.map((button, index) => (
            <span
              className={styles.button}
              key={index}
              onClick={button.handleButtonClick}
            >
              {button.value}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
