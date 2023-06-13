import { ReactNode } from 'react';

export interface ModalParts {
  head: ReactNode | null;
  body: ReactNode | null;
  tail: ReactNode | null;
}
