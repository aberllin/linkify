import styled, { css } from 'styled-components';
import Logo from '~/components/atoms/Logo';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>
    <Logo size="large" />
    {children}
  </Container>
);

const Container = styled.div(
  ({ theme }) => css`
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.space('xxxxl')};
    max-width: 460px;
    width: 100%;
    height: 100vh;
  `,
);

export default AuthLayout;
