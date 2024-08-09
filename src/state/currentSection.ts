import { atom } from 'recoil';

export type Section = 'links' | 'profile';
const currentSection = atom<Section>({
  key: 'currentSection',
  default: 'links',
});

export default currentSection;
