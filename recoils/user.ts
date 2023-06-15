import { atom } from 'recoil';
import { v1 } from 'uuid';

import { User, ProfileTab } from 'types/userTypes';

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

export const profileTabState = atom<ProfileTab>({
  key: `tabState/${v1()}`,
  default: 'profile',
});
