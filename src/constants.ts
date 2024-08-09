import { Option } from '~/components/molecules/Dropdown';
import type { IconName } from './components/atoms/Icon';

export type LinkType =
  | 'github'
  | 'frontendMentor'
  | 'twitter'
  | 'linkedin'
  | 'youtube'
  | 'facebook'
  | 'twitch'
  | 'devto'
  | 'codewars'
  | 'codepen'
  | 'freecodecamp'
  | 'gitlab'
  | 'hashnode'
  | 'stackoverflow';

type LinkData = {
  label: string;
  icon: IconName;
  color: string;
  placeholder: string;
};

export const linkData: { [key in LinkType]: LinkData } = {
  github: {
    label: 'GitHub',
    icon: 'github',
    color: '#333333',
    placeholder: 'https://github.com/username',
  },
  frontendMentor: {
    label: 'Frontend Mentor',
    icon: 'frontend-mentor',
    color: '#3F3D56',
    placeholder: 'https://www.frontendmentor.io/profile/username',
  },
  twitter: {
    label: 'Twitter',
    icon: 'twitter',
    color: '#1DA1F2',
    placeholder: 'https://twitter.com/username',
  },
  linkedin: {
    label: 'LinkedIn',
    icon: 'linkedin',
    color: '#0077B5',
    placeholder: 'https://www.linkedin.com/in/username',
  },
  youtube: {
    label: 'YouTube',
    icon: 'youtube',
    color: '#FF0000',
    placeholder: 'https://www.youtube.com/user/username',
  },
  facebook: {
    label: 'Facebook',
    icon: 'facebook',
    color: '#1877F2',
    placeholder: 'https://www.facebook.com/username',
  },
  twitch: {
    label: 'Twitch',
    icon: 'twitch',
    color: '#9146FF',
    placeholder: 'https://www.twitch.tv/username',
  },
  devto: {
    label: 'Dev.to',
    icon: 'devto',
    color: '#0A0A0A',
    placeholder: 'https://dev.to/username',
  },
  codewars: {
    label: 'Codewars',
    icon: 'codewars',
    color: '#AD2C27',
    placeholder: 'https://www.codewars.com/users/username',
  },
  codepen: {
    label: 'Codepen',
    icon: 'codepen',
    color: '#000000',
    placeholder: 'https://codepen.io/username',
  },
  freecodecamp: {
    label: 'freeCodeCamp',
    icon: 'freecodecamp',
    color: '#006400',
    placeholder: 'https://www.freecodecamp.org/username',
  },
  gitlab: {
    label: 'GitLab',
    icon: 'gitlab',
    color: '#FC6D26',
    placeholder: 'https://gitlab.com/username',
  },
  hashnode: {
    label: 'Hashnode',
    icon: 'hashnode',
    color: '#2962FF',
    placeholder: 'https://hashnode.com/@username',
  },
  stackoverflow: {
    label: 'Stack Overflow',
    icon: 'stack-overflow',
    color: '#F48024',
    placeholder: 'https://stackoverflow.com/users/userid/username',
  },
};

export const linkOptions: Array<Option<LinkType>> = Object.keys(linkData).map(
  key => {
    const linkType = key as LinkType;
    return {
      icon: linkData[linkType].icon,
      label: linkData[linkType].label,
      value: linkType,
    };
  },
);
