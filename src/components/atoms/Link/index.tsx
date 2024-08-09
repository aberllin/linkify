import React from 'react';
import styled, { css } from 'styled-components';

type Props = {
  url: string;
  children: React.ReactNode;
};
const Link: React.FC<Props> = ({ url, children }) => (
  <StyledLink href={url}>{children}</StyledLink>
);

const StyledLink = styled.a(
  ({ theme }) => css`
    cursor: pointer;
    color: ${theme.color('purple')};
    font-weight: ${theme.fontWeight('regular')};
    text-decoration: none;
    transition: text-decoration 0.3s ease;

    &:hover {
      text-decoration: underline;
    }
  `,
);

export default Link;
