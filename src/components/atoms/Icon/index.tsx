import React from 'react';
import icons from './components';
import type { SystemColorPalette } from '~/theme';

export type IconName = keyof typeof icons;

type Props = {
  name: IconName;
  color?: keyof SystemColorPalette;
};

const Icon: React.FC<Props> = ({ name, color = 'lightGrey' }) => {
  const Icon = icons[name];

  return <Icon color={color} />;
};

export default Icon;
