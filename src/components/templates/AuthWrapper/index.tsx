import styled, { css } from 'styled-components';

const AuthWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <Container>{children}</Container>
);

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    background-color: ${theme.color('white')};
    border-radius: ${theme.border('base')};
    padding: ${theme.space('xxxl')};
    width: 100%;
  `,
);

export default AuthWrapper;
