import React from 'react';

export type IllustrationName = 'empty' | 'phone-mockup';

const Illustration: React.FC<{ name: IllustrationName }> = ({ name }) => (
  // eslint-disable-next-line @next/next/no-img-element
  <img src={`/images/illustration-${name}.svg`} alt={name} />
);

export default Illustration;
