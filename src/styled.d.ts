import {} from 'styled-components';
import System from './theme/System';

declare module 'styled-components' {
  export interface DefaultTheme extends System {}
}
