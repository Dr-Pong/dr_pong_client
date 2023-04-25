type ButtonStyle = 'basic' | 'long';

type ButtonColor = 'black' | 'white';

export interface ButtonProps {
  style: ButtonStyle;
  color: ButtonColor;
  handleButtonClick: React.FormEventHandler<HTMLFormElement> | null;
  children: React.ReactNode;
}
