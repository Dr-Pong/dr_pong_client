type ButtonStyle =
  | 'basic'
  | 'big'
  | 'thin'
  | 'short'
  | 'small'
  | 'flex'
  | 'round'
  | 'square'
  | 'dropdown'
  | 'fit';

type ButtonColor =
  | 'black'
  | 'white'
  | 'opaque'
  | 'default'
  | 'pink'
  | 'purple'
  | 'transparent';

export interface ButtonDesign {
  style: ButtonStyle;
  color: ButtonColor;
}

export interface ButtonProps {
  style: ButtonStyle;
  color: ButtonColor;
  handleButtonClick?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}
