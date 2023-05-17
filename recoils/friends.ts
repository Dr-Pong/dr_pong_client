import { atom } from 'recoil';
import { v1 } from 'uuid';

import { FriendTab } from 'types/friendTypes';

export const friendsTabState = atom<FriendTab>({
  key: `friendsTabState/${v1()}`,
  default: 'friend',
});

export const dropdownVisibilityState = atom<boolean>({
  key: `dropdownVisibilityState/${v1()}`,
  default: false,
});
