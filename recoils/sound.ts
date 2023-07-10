import { atom } from 'recoil';
import { v1 } from 'uuid';

export const bgmState = atom<boolean>({
  key: `bgmState/${v1()}`,
  default: false,
});

export const soundEffectState = atom<boolean>({
  key: `soundEffectState/${v1()}`,
  default: false,
});
