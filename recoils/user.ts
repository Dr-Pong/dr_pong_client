import { atom } from 'recoil';
import { v1 } from 'uuid';

import { User } from 'types/userTypes';

export const editableState = atom<boolean>({
  key: `editableState/${v1()}`,
  default: false,
});

export const userState = atom<User>({
  key: `userState/${v1()}`,
  default: {
    nickname: '',
    imgUrl: '',
    tfaRequired: false,
    roleType: 'guest',
  },
});

export const tabState = atom<string>({
  key: `tabState/${v1()}`,
  default: 'profile',
});
