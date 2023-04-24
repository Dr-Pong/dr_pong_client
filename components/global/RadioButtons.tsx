import styles from 'styles/global/RadioButtons.module.scss';

type Option = {
  id: string;
  value: string;
};

type RadioButtonsProps = {
  name: string;
  options: Option[];
  currentId: string;
};

export default function RadioButtons({
  name,
  options,
  currentId,
}: RadioButtonsProps) {
  return (
    <div className={styles.radioButtonsContainer}>
      {options.map(({ id, value }, i) => {
        return (
          <span key={i}>
            <input
              type='radio'
              name={name}
              id={id}
              value={value}
              defaultChecked={id === currentId}
            />
            <label htmlFor={id}>{value}</label>
          </span>
        );
      })}
    </div>
  );
}
