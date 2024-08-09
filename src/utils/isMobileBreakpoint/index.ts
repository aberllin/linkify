import theme from '~/theme';

// Used
const isMobileBreakpoint = () =>
  theme.getCurrentBreakpoint().includes('mobile');

export default isMobileBreakpoint;
