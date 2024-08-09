import React, { type ButtonHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import isMobileBreakpoint from '~/utils/isMobileBreakpoint';

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  appearance?: 'primary' | 'secondary';
  label: React.ReactNode;
  width?: string;
};

const Button: React.FC<Props> = ({
  appearance = 'primary',
  label,
  width = 'auto',
  ...rest
}) => {
  const isMobile = isMobileBreakpoint();
  return (
    <ButtonElement
      $appearance={appearance}
      $width={width}
      $isMobile={isMobile}
      {...rest}
    >
      {label}
    </ButtonElement>
  );
};

const ButtonElement = styled.button<{
  $appearance: Props['appearance'];
  $width: Props['width'];
  $isMobile: boolean;
}>(
  ({ theme, $appearance, $width, $isMobile }) => css`
    cursor: pointer;
    padding: ${`${theme.space('base')} ${$isMobile ? theme.space('base') : theme.space('xxl')}`};
    height: 46px;
    width: ${$width};
    font-size: ${theme.space('m')};
    font-weight: ${theme.fontWeight('medium')};
    border-radius: ${theme.border('s')};
    border: 1px solid transparent;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    ${$appearance === 'primary' &&
    css`
      background: ${theme.color('purple')};
      color: ${theme.color('white')};

      &:hover {
        background: ${theme.color('purpleHover')};
      }

      &:active {
        background: ${theme.color('purpleHover')};
        box-shadow: 0px 0px 32px 0px rgba(99, 60, 255, 0.25);
      }

      &:disabled {
        background: ${theme.color('lightPurple')};
        color: ${theme.color('white')};
        pointer-events: none;
        cursor: not-allowed;
      }
    `}

    ${$appearance === 'secondary' &&
    css`
      background: transparent;
      color: ${theme.color('purple')};
      border-color: ${theme.color('purple')};

      &:hover {
        background: ${theme.color('lightPurple')};
      }

      &:active {
        background: ${theme.color('purpleHover')};
        box-shadow: 0 0 32px 0 rgba(190, 173, 255, 0.25);
        color: ${theme.color('white')};
      }

      &:disabled {
        opacity: 0.5;
        pointer-events: none;
        cursor: not-allowed;
      }
    `}
  `,
);

export default Button;
