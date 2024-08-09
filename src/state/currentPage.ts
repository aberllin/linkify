import { atom } from 'recoil';

type Page = 'links' | 'preview';
const currentPage = atom<Page>({
  key: 'currentPage',
  default: 'links',
});

export default currentPage;
