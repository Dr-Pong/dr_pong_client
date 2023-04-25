type ButtonStyle = 'basic' | 'big';

type ButtonColor = 'black' | 'white';

export interface ButtonProps {
  style: ButtonStyle;
  color: ButtonColor;
  handleButtonClick?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}
