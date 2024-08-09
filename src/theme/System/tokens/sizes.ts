import { SystemBreakpoint } from './breakpoints';
// Used
export type SizeMap = {
  xxxxs: string;
  xxxs: string;
  xxs: string;
  xs: string;
  s: string;
  base: string;
  m: string;
  l: string;
  xl: string;
  xxl: string;
  xxxl: string;
  xxxxl: string;
};

export type SystemSize = keyof SizeMap;
export type SystemSizeMap = {
  [key in SystemBreakpoint]: SizeMap;
};

const sizes: SystemSizeMap = {
  mobile: {
    xxxxs: '2px',
    xxxs: '4px',
    xxs: '8px',
    xs: '10px',
    s: '12px',
    base: '14px',
    m: '16px',
    l: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '40px',
    xxxxl: '48px',
  },
  tablet: {
    xxxxs: '2px',
    xxxs: '4px',
    xxs: '8px',
    xs: '10px',
    s: '12px',
    base: '14px',
    m: '16px',
    l: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '40px',
    xxxxl: '48px',
  },
  tabletLandscape: {
    xxxxs: '2px',
    xxxs: '4px',
    xxs: '8px',
    xs: '10px',
    s: '12px',
    base: '14px',
    m: '16px',
    l: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '40px',
    xxxxl: '48px',
  },
  desktop: {
    xxxxs: '2px',
    xxxs: '4px',
    xxs: '8px',
    xs: '10px',
    s: '12px',
    base: '14px',
    m: '16px',
    l: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '40px',
    xxxxl: '48px',
  },
  desktopBig: {
    xxxxs: '2px',
    xxxs: '4px',
    xxs: '8px',
    xs: '10px',
    s: '12px',
    base: '14px',
    m: '16px',
    l: '18px',
    xl: '24px',
    xxl: '32px',
    xxxl: '40px',
    xxxxl: '48px',
  },
};

export default sizes;
