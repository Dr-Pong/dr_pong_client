import React from 'react';

import styles from 'styles/modals/Modal.module.scss';

type ModalPhraseProps = {
  children: React.ReactNode;
};

export default function ModalPhrase({ children }: ModalPhraseProps) {
  return <div className={styles.modalPhrase}>{children}</div>;
}
