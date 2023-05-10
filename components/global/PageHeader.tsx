import styles from 'styles/global/PageHeader.module.scss';

type pageHeaderProps = {
  title: string;
  button?: {
    value: React.ReactNode;
    handleButtonClick: () => void;
  };
};

export default function PageHeader({ title, button }: pageHeaderProps) {
  return (
    <div className={styles.pageHeaderContainer}>
      <span>{title}</span>
      {button && <span onClick={button.handleButtonClick}>{button.value}</span>}
    </div>
  );
}
