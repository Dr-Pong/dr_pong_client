import React from 'react';
import { BsGithub } from 'react-icons/bs';

import styles from 'styles/layouts/Footer.module.scss';

export default function Footer() {
  return (
    <div className={styles.footerContainer}>
      ⓒ 2023 Dr.Pong
      <hr />
      <a href='https://github.com/Dr-Pong' target='_blank'>
        <BsGithub className={styles.githubIcon} />
      </a>
    </div>
  );
}
