// Used
const breakpoints = {
  mobile: '599px',
  tablet: '720px',
  tabletLandscape: '900px',
  desktop: '1200px',
  desktopBig: '1800px',
};

export type SystemBreakpointMap = typeof breakpoints;
export type SystemBreakpoint = keyof SystemBreakpointMap;
export default breakpoints;
