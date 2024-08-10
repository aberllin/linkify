import React, { useState } from 'react';
import AuthLayout from '~/components/templates/AuthLayout';
import styled, { css } from 'styled-components';
import Button from '~/components/atoms/Button';
import Link from '~/components/atoms/Link';
import Typography from '~/components/atoms/Typography';
import Input from '~/components/molecules/Input';
import AuthWrapper from '~/components/templates/AuthWrapper';
import { useSetRecoilState } from 'recoil';
import profileDetails from '~/state/profileDetails';
import { useRouter } from 'next/router';
import register from '~/utils/register';
import isValidEmail from '~/utils/isValidEmail';
import AuthForm from '~/components/templates/AuthForm';

const text = {
  header: 'Create account',
  subheading: 'Let’s get you started sharing your links!',
  emailLabel: 'Email address',
  emailPlaceholder: 'e.g example@gmail.com',
  passwordLabel: 'Create password',
  passwordPlaceholder: 'At least 8 characters',
  confirmPasswordLabel: 'Confirm password',
  buttonLabel: 'Register',
  haveAccount: `Already have an account?`,
  logIn: 'Login',
  passwordRule: 'Password must contain at least 8 characters',
  errorEmail: 'Please enter a valid email address',
  errorUsername: 'Username must be at least 3 characters long',
  errorPassword: 'Password must be at least 8 characters long',
  errorPasswordMatch: 'Passwords do not match',
};

type OnChage = {
  key: 'email' | 'password' | 'confirmPassword' | 'username';
  value: string;
};

const CreateAccountPage: React.FC = () => {
  const [state, setState] = useState<{
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  }>({ email: '', username: '', password: '', confirmPassword: '' });

  const [error, setError] = useState<Partial<
    Record<
      'email' | 'username' | 'password' | 'confirmPassword' | 'generic',
      string
    >
  > | null>(null);
  const setProfileDetails = useSetRecoilState(profileDetails);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const validateForm = () => {
    const { email, username, password, confirmPassword } = state;
    if (!email || !isValidEmail(email)) {
      setError({ email: text.errorEmail });
      return false;
    }
    if (!username || username.length < 3) {
      setError({ username: text.errorUsername });
      return false;
    }
    if (!password || password.length < 8) {
      setError({ password: text.errorPassword });
      return false;
    }
    if (password !== confirmPassword) {
      setError({ confirmPassword: text.errorPasswordMatch });
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    const { email, username, password } = state;
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }
    setIsLoading(true);

    const { error, data } = await register({ email, username, password });

    if (error) {
      return setError({ generic: error });
    }

    const userId = data.user.id;
    const userEmail = data.user.email;
    const userName = data.user.username;

    if (userId) {
      setProfileDetails(prev => {
        if (!prev) {
          return {
            userId,
            email: userEmail,
            userName,
          };
        }

        return { ...prev, userId, email: userEmail };
      });
    }

    setIsLoading(false);
    return router.push('/dashboard');
  };

  const onChange = ({ key, value }: OnChage) => {
    setError(null);
    setState(prev => ({ ...prev, [key]: value }));
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
              value={state.email}
              onChange={e => onChange({ key: 'email', value: e.target.value })}
              errors={error?.email ? [error.email] : undefined}
            />
            <Input
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={state.username}
              onChange={e =>
                onChange({ key: 'username', value: e.target.value })
              }
              errors={error?.username ? [error.username] : undefined}
            />
            <Input
              type="password"
              icon="password"
              label={text.passwordLabel}
              placeholder={text.passwordPlaceholder}
              value={state.password}
              onChange={e =>
                onChange({ key: 'password', value: e.target.value })
              }
              errors={error?.password ? [error.password] : undefined}
            />
            <Input
              type="password"
              icon="password"
              label={text.confirmPasswordLabel}
              placeholder={text.passwordPlaceholder}
              value={state.confirmPassword}
              onChange={e =>
                onChange({ key: 'confirmPassword', value: e.target.value })
              }
              errors={
                error?.confirmPassword ? [error.confirmPassword] : undefined
              }
            />
            <Typography color="grey" variant="bodyS">
              {text.passwordRule}
            </Typography>
            <Button
              label={isLoading ? 'Loading...' : text.buttonLabel}
              width="100%"
              type="submit"
            />
          </AuthForm>
          <div>
            <Typography color="grey" variant="bodyM">
              {text.haveAccount}
            </Typography>{' '}
            <Link url="/login">{text.logIn}</Link>
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

export default CreateAccountPage;
