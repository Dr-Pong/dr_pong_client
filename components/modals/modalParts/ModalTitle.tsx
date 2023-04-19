import styles from 'styles/layouts/Modal.module.scss';

type ModalTitleProps = {
  title: string;
};

export default function ModalTitle({ title }: ModalTitleProps) {
  return <div className={styles.modalTitle}>{title}</div>;
}
