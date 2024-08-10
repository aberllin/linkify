import { atom } from 'recoil';

export type Toast = {
  id: string;
  message: string;
  level: 'error' | 'success' | 'info';
};

export const toastsState = atom<Array<Toast>>({
  key: 'toastsState',
  default: [],
});
