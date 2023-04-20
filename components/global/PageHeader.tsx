import styles from 'styles/global/PageHeader.module.scss';

type pageHeaderProps = {
  title: string;
  button: React.ReactNode | null;
};

export default function PageHeader({ title, button }: pageHeaderProps) {
  return (
    <div className={styles.pageHeaderContainer}>
      <span>{title}</span>
      <span>{button}</span>
    </div>
  );
}
