import { atom } from 'recoil';
import { v1 } from 'uuid';

import { SideBarType } from 'types/sideBarTypes';

export const sideBarState = atom<SideBarType>({
  key: `openModalState/${v1()}`,
  default: null,
});
