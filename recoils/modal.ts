import { atom } from 'recoil';
import { v1 } from 'uuid';

import { ModalParts } from 'types/modalTypes';

export const modalPartsState = atom<ModalParts>({
  key: `modalPartsState/${v1()}`,
  default: { head: null, body: null, tail: null, enableBackdropClose: false },
});

export const openModalState = atom<boolean>({
  key: `openModalState/${v1()}`,
  default: false,
});
