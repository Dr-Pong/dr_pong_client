import { atom } from 'recoil';
import { v1 } from 'uuid';

import { AlertType } from 'components/alerts/Alert';

export const openAlertState = atom<boolean>({
  key: `openAlertState/${v1()}`,
  default: false,
});

export const alertTypeState = atom<AlertType>({
  key: `openAlertState/${v1()}`,
  default: 'success',
});
