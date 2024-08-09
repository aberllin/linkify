import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '~/components/atoms/Button';
import Link from '~/components/atoms/Link';
import Typography from '~/components/atoms/Typography';
import Input from '~/components/molecules/Input';
import AuthLayout from '~/components/templates/AuthLayout';
import AuthWrapper from '~/components/templates/AuthWrapper';

const text = {
  header: 'Login',
  subheading: 'Add your details below to get back into the app',
  emailLabel: 'Email address',
  emailPlaceholder: 'e.g example@gmail.com',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter your password',
  buttonLabel: 'Login',
  noAccount: `Don't have an account?`,
  createAccount: 'Create account',
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Invalid email or password');
      }

      // Redirect or update state on successful login
      console.log('Logged in successfully');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <AuthLayout>
      <AuthWrapper>
        <Header>
          <Typography variant="h1">{text.header}</Typography>
          <Typography color="grey" variant="bodyM">
            {text.subheading}
          </Typography>
        </Header>
        <Main>
          {error && (
            <Typography color="error" variant="bodyM">
              {error}
            </Typography>
          )}
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              icon="email"
              label={text.emailLabel}
              placeholder={text.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
            />
            <Input
              type="password"
              icon="password"
              label={text.passwordLabel}
              placeholder={text.passwordPlaceholder}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Button label={text.buttonLabel} width="100%" type="submit" />{' '}
          </form>
          <div>
            <Typography color="grey" variant="bodyM">
              {text.noAccount}
            </Typography>{' '}
            <Link url="/register">{text.createAccount}</Link>
          </div>
        </Main>
      </AuthWrapper>
    </AuthLayout>
  );
};

const Header = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
  `,
);

const Main = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space('l')};
    margin-top: ${theme.space('xl')};
  `,
);

export default Login;
