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
  | 'transparent';

type ButtonColor = 'black' | 'white' | 'opaque' | 'default' | 'pink' | 'purple' | 'none';

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
