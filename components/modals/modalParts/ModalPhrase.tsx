import styles from 'styles/layouts/Modal.module.scss';

type ModalPhraseProps = {
  phrase: string;
};

export default function ModalPhrase({ phrase }: ModalPhraseProps) {
  return <div className={styles.modalPhrase}>{phrase}</div>;
}
