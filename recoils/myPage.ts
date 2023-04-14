import { atom } from 'recoil';
import { v1 } from 'uuid';

export const editableState = atom<boolean>({
  key: `editableState/${v1()}`,
  default: false,
});
