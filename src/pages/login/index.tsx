import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '~/components/atoms/Button';
import Link from '~/components/atoms/Link';
import Typography from '~/components/atoms/Typography';
import Input from '~/components/molecules/Input';
import AuthLayout from '~/components/templates/AuthLayout';
import AuthWrapper from '~/components/templates/AuthWrapper';
import { useRouter } from 'next/router';

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
  errorEmail: 'Please enter a valid email address',
  errorPassword: 'Please enter your password',
  errorInvalid: 'Invalid email or password',
  errorGeneral: 'An error occurred. Please try again.',
};

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    if (!email || !/\S+@\S+\.\S+/.test(email)) {
      setError(text.errorEmail);
      return false;
    }
    if (!password) {
      setError(text.errorPassword);
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || text.errorInvalid);
      }

      const data = await response.json();
      console.log('Logged in successfully', data);

      // Redirect to dashboard on successful login
      router.push('/dashboard');
    } catch (err) {
      setError(err.message || text.errorGeneral);
    } finally {
      setIsLoading(false);
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
            <ErrorMessage>
              <Typography color="white" variant="bodyM">
                {error}
              </Typography>
            </ErrorMessage>
          )}
          <form onSubmit={handleSubmit}>
            <Input
              type="email"
              icon="email"
              label={text.emailLabel}
              placeholder={text.emailPlaceholder}
              value={email}
              onChange={e => setEmail(e.target.value)}
              disabled={isLoading}
            />
            <Input
              type="password"
              icon="password"
              label={text.passwordLabel}
              placeholder={text.passwordPlaceholder}
              value={password}
              onChange={e => setPassword(e.target.value)}
              disabled={isLoading}
            />
            <Button
              label={isLoading ? 'Logging in...' : text.buttonLabel}
              width="100%"
              type="submit"
              disabled={isLoading}
            />
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

const ErrorMessage = styled.div(
  ({ theme }) => css`
    width: 100%;
    padding: ${theme.space('m')};
    background-color: ${theme.color('error')};
    border-radius: ${theme.border('s')};
    margin-bottom: ${theme.space('m')};
  `,
);

export default Login;
