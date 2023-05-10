type ButtonStyle =
  | 'basic'
  | 'big'
  | 'thin'
  | 'short'
  | 'small'
  | 'flex'
  | 'round'
  | 'square';

type ButtonColor = 'black' | 'white';

export interface ButtonProps {
  style: ButtonStyle;
  color: ButtonColor;
  handleButtonClick?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}
