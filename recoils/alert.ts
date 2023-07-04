import { atom } from 'recoil';
import { v1 } from 'uuid';

import { AlertType } from 'components/alerts/Alert';

export const alertState = atom<AlertType>({
  key: `alertState/${v1()}`,
  default: null,
});
