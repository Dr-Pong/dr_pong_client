type ButtonStyle = 'basic';

type ButtonColor = 'black' | 'white';

export interface ButtonProps {
  style: ButtonStyle;
  color: ButtonColor;
  value: string;
  handleButtonClick: React.FormEventHandler<HTMLFormElement>;
}
