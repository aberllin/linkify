import { atom, selectorFamily } from 'recoil';
import type { LinkItemProps } from '~/components/organisms/LinksBlock/components/LinkItemBlock/index.js';

const linksState = atom<Array<LinkItemProps>>({
  key: 'linksState',
  default: [],
});

// Used
export const linkByKeyState = selectorFamily<LinkItemProps | undefined, string>(
  {
    key: 'linkByKeyState',
    get:
      linkId =>
      ({ get }) => {
        const links = get(linksState);
        return links.find(link => link.id === linkId);
      },
    set:
      linkId =>
      ({ get, set }, newValue) => {
        const links = get(linksState);
        const updatedLinks = links.map(link =>
          link.id === linkId ? { ...link, ...newValue } : link,
        );
        set(linksState, updatedLinks);
      },
  },
);

export default linksState;
