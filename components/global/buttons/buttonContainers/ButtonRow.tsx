import styles from 'styles/global/Button.module.scss';

type ButtonRowProps = {
  buttonList: React.ReactNode[];
};

export default function ButtonRow({ buttonList }: ButtonRowProps) {
  return (
    <div className={styles.buttonRowContainer}>
      {buttonList.map((el: React.ReactNode) => {
        return <div>{el}</div>;
      })}
    </div>
  );
}
