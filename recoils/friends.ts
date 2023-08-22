import { atom, selector } from 'recoil';
import { v1 } from 'uuid';

import { FriendTab } from 'types/friendTypes';

export const friendsTabState = atom<FriendTab>({
  key: `friendsTabState/${v1()}`,
  default: 'all',
});

export const dropdownUserState = atom<string>({
  key: `dropdownUserState/${v1()}`,
  default: '',
});

export const showDropdownSelector = selector({
  key: `dropdownVisibility/${v1()}`,
  get: ({ get }) => {
    const selectedUser = get(dropdownUserState);

    return (user: string) => user === selectedUser;
  },
});
