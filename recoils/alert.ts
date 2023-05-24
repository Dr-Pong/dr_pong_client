import { atom } from 'recoil';
import { v1 } from 'uuid';

export const openAlertState = atom<boolean>({
  key: `openAlertState/${v1()}`,
  default: false,
});
