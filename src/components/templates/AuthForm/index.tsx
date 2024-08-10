import styled, { css } from 'styled-components';

type Props = {
  onSubmit: (e: React.FormEvent) => Promise<boolean | void>;
  children: React.ReactNode;
};

const AuthForm: React.FC<Props> = ({ children, onSubmit }) => (
  <Container onSubmit={onSubmit}>{children}</Container>
);

const Container = styled.form(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: ${theme.space('base')};
  `,
);

export default AuthForm;
