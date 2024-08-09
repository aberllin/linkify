import React from 'react';
import styled, { css } from 'styled-components';
import type { SystemColorPalette, SystemFontWeight } from '~/theme';

type Variant = 'h1' | 'h2' | 'bodyM' | 'bodyS' | 'label';

type TypographyProps = {
  as?: React.ElementType;
  fontSize?: string;
  fontWeight?: SystemFontWeight;
  color?: keyof SystemColorPalette;
  variant: Variant;
  children: React.ReactNode;
  onClick?: () => void;
};

const typographyStyles: {
  [key in Variant]: {
    fontSize: TypographyProps['fontSize'];
    fontWeight: TypographyProps['fontWeight'];
  };
} = {
  h1: { fontSize: '32px', fontWeight: 'bold' },
  h2: { fontSize: '16px', fontWeight: 'medium' },
  bodyM: { fontSize: '16px', fontWeight: 'regular' },
  bodyS: { fontSize: '12px', fontWeight: 'regular' },
  label: { fontSize: '16px', fontWeight: 'bold' },
};

const Typography: React.FC<TypographyProps> = ({
  variant,
  children,
  color = 'darkGrey',
  as,
  onClick,
  ...props
}) => {
  const Component = as || 'span';
  const { fontSize, fontWeight } = typographyStyles[variant];

  return (
    <StyledTypography
      as={Component}
      fontSize={fontSize}
      fontWeight={fontWeight}
      $color={color}
      $clickable={!!onClick}
      onClick={onClick}
      {...props}
    >
      {children}
    </StyledTypography>
  );
};

const StyledTypography = styled.span<{
  fontSize?: string;
  fontWeight?: SystemFontWeight;
  $color: keyof SystemColorPalette;
  $clickable?: boolean;
}>(
  ({
    theme,
    fontSize,
    fontWeight = 'regular',
    $color,
    $clickable = false,
  }) => css`
    font-size: ${fontSize};
    font-weight: ${theme.fontWeight(fontWeight)};
    line-height: 1.5;
    color: ${theme.color($color)};
    transition: all 0.3s ease;

    cursor: ${$clickable ? 'pointer' : 'inherit'};

    &:hover {
      text-decoration: ${$clickable ? 'underline' : 'none'};
    }
  `,
);

export default Typography;
