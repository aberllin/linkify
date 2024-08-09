import React from 'react';

export type IconName =
  | 'arrow-right'
  | 'changes-saved'
  | 'chevron-down'
  | 'chevron-up'
  | 'codepen'
  | 'codewars'
  | 'devto'
  | 'drag-and-drop'
  | 'email'
  | 'facebook'
  | 'freecodecamp'
  | 'frontend-mentor'
  | 'github'
  | 'gitlab'
  | 'hashnode'
  | 'link-copied-to-clipboard'
  | 'link'
  | 'linkedin'
  | 'links-header'
  | 'password'
  | 'preview-header'
  | 'profile-details-header'
  | 'stack-overflow'
  | 'twitch'
  | 'twitter'
  | 'upload-image'
  | 'youtube';

const Icon: React.FC<{ name: IconName }> = ({ name }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/images/icon-${name}.svg`} alt={name} />
);

export default Icon;
