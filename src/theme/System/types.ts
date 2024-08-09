// Define the font sizes for different screen sizes

// Used
export interface SystemFontSizes {
  xxs?: string | number;
  xs?: string | number;
  s: string | number;
  base: string | number;
  m: string | number;
  l: string | number;
  xl?: string | number;
}

// Define the breakpoints
export interface SystemBreakpoints {
  mobile: string;
  tablet: string;
  desktop: string;
}

// Define the color palette
interface SystemColorPaletteColor {
  base: string;
  text?: string;
  darker?: string;
}

export interface SystemColorPalette {
  primary: SystemColorPaletteColor;
  secondary: SystemColorPaletteColor;
  error: SystemColorPaletteColor;
  success: SystemColorPaletteColor;
  warning: SystemColorPaletteColor;
  info: SystemColorPaletteColor;
}

export interface ThemeType {
  sizes: {
    mobile: SystemFontSizes;
    tablet: SystemFontSizes;
    desktop: SystemFontSizes;
  };
  breakpoints: SystemBreakpoints;
  colors: {
    primary: SystemColorPaletteColor;
    secondary: SystemColorPaletteColor;
    text: {
      primary: string;
      secondary: string;
      disabled: string;
      placeholder: string;
    };
    background: {
      default: string;
      paper: string;
      sidebar: string;
      input: string;
      button: string;
      card: string;
    };
    border: {
      default: string;
      input: string;
    };
    state: {
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    gradients: {
      sidebar: string;
    };
  };
  baseFontSize: string;
}
