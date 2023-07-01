import { QueryKey, UseMutationResult } from 'react-query';

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
  | 'fit'
  | 'long'
  | 'ball';

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

export interface ButtonProps extends ButtonDesign {
  handleButtonClick?: React.FormEventHandler<HTMLFormElement>;
  children: React.ReactNode;
}

export interface MutationButtonProps extends ButtonProps {
  mutationRequest:
    | UseMutationResult<object, unknown, object, unknown>
    | UseMutationResult<object, unknown, void, unknown>;
  body?: object;
  queryKeys?: QueryKey[];
  handleOnClick?: () => void;
}
