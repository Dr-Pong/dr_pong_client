import { ButtonProps } from 'types/buttonTypes';

import styles from 'styles/global/Button.module.scss';

export default function SubmitButton({
  style,
  color,
  value,
  handleButtonClick,
}: ButtonProps) {
  const handleSubmit = () => {};
  return (
    <form onSubmit={handleButtonClick || handleSubmit}>
      <button className={`${styles[style]} ${styles[color]}`} type='submit'>
        {value}
      </button>
    </form>
  );
}
