import styled, { css } from 'styled-components';
import Link from '~/components/atoms/Link';

export default function Home() {
  return (
    <Container>
      <Title>Welcome to Our Application</Title>
      <Description>This is the home page.</Description>
      <Link url="/login">
        <a>Log in</a>
      </Link>
    </Container>
  );
}

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: ${theme.color('lightGrey')};
    padding: ${theme.space('xl')};
  `,
);

const Title = styled.h1(
  ({ theme }) => css`
    font-size: ${theme.fontSize('xxl')};
    color: ${theme.color('darkGrey')};
  `,
);

const Description = styled.p(
  ({ theme }) => css`
    font-size: ${theme.fontSize('m')};
    color: ${theme.color('grey')};
    margin-bottom: ${theme.space('l')};
  `,
);

const PreviewBackground = styled.div(
  ({ theme }) => css`
    background: ${theme.color('purple')};
    height: 350px;
    border-bottom-left-radius: ${theme.border('m')};
    border-bottom-right-radius: ${theme.border('m')};
  `,
);
