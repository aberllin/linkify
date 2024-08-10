import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import Button from '~/components/atoms/Button';
import Link from '~/components/atoms/Link';
import Typography from '~/components/atoms/Typography';
import Input from '~/components/molecules/Input';
import AuthLayout from '~/components/templates/AuthLayout';
import AuthWrapper from '~/components/templates/AuthWrapper';
import { useRouter } from 'next/router';
import AuthForm from '~/components/templates/AuthForm';
import login from '~/utils/login';

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
  const [state, setState] = useState<{
    email: string;
    password: string;
  }>({ email: '', password: '' });

  const [error, setError] = useState<Partial<
    Record<'email' | 'password' | 'generic', string>
  > | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const validateForm = () => {
    const { email, password } = state;
    if (email === '' || !/\S+@\S+\.\S+/.test(email)) {
      setError({ email: text.errorEmail });
      return false;
    }
    if (password === '') {
      setError({ password: text.errorPassword });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    const { email, password } = state;

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    const { error, data } = await login({ email, password });

    if (error) {
      setError({ generic: error });
      return setIsLoading(false);
    }

    if (data) {
      setIsLoading(false);
      return router.push('/dashboard');
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
          {error?.generic && (
            <ErrorMessage>
              <Typography color="white" variant="bodyM">
                {error.generic}
              </Typography>
            </ErrorMessage>
          )}
          <AuthForm onSubmit={handleSubmit}>
            <Input
              type="email"
              icon="email"
              label={text.emailLabel}
              placeholder={text.emailPlaceholder}
              value={error?.email}
              onChange={e =>
                setState(prev => ({ ...prev, email: e.target.value }))
              }
              disabled={isLoading}
              errors={error?.email ? [error.email] : undefined}
            />
            <Input
              type="password"
              icon="password"
              label={text.passwordLabel}
              placeholder={text.passwordPlaceholder}
              value={state.password}
              onChange={e =>
                setState(prev => ({ ...prev, password: e.target.value }))
              }
              disabled={isLoading}
              errors={error?.password ? [error.password] : undefined}
            />
            <Button
              label={isLoading ? 'Logging in...' : text.buttonLabel}
              width="100%"
              type="submit"
              disabled={isLoading}
            />
          </AuthForm>
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
