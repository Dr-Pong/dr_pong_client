import styles from 'styles/global/Button.module.scss';

type SubmitButtonProps = {
  style: 'basic';
  color: 'black' | 'white';
  value: string;
  handleButtonClick: React.FormEventHandler<HTMLFormElement>;
};

export default function SubmitButton({
  style,
  color,
  value,
  handleButtonClick,
}: SubmitButtonProps) {
  return (
    <form onSubmit={handleButtonClick}>
      <button className={`${styles[style]} ${styles[color]}`} type='submit'>
        {value}
      </button>
    </form>
  );
}
