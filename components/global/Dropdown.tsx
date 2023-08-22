import React, { ReactNode } from 'react';

import styles from 'styles/global/Dropdown.module.scss';

type DropdownProps = {
  style: string;
  children: ReactNode;
};

export default function Dropdown({ style, children }: DropdownProps) {
  return (
    <article className={`${styles.dropdown} ${styles[style]}`}>
      {children}
    </article>
  );
}
