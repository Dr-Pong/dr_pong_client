import React from 'react';

import styles from 'styles/global/Button.module.scss';

type ButtonRowProps = {
  buttonList: React.ReactNode[];
};

export default function ButtonRow({ buttonList }: ButtonRowProps) {
  return (
    <div className={styles.buttonRowContainer}>
      {buttonList.map((el: React.ReactNode, i) => {
        return <div key={i}>{el}</div>;
      })}
    </div>
  );
}
