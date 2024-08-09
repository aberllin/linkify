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
};

const CreateAccountPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const setProfileDetails = useSetRecoilState(profileDetails);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, username, password }),
      });

      if (!response.ok) {
        throw new Error('Registration failed');
      }

      const data = await response.json();
      const userId = data.user._id;

      if (userId) {
        setProfileDetails(prev => {
          if (!prev) return prev;
          return { ...prev, userId };
        });
      }
      console.log({ data });
      console.log('Registered successfully with userId:', userId);
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
              type="text"
              label="Username"
              placeholder="Enter your username"
              value={username}
              onChange={e => setUsername(e.target.value)}
            />
            <Input
              type="password"
              icon="password"
              label={text.passwordLabel}
              placeholder={text.passwordPlaceholder}
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
            <Input
              type="password"
              icon="password"
              label={text.confirmPasswordLabel}
              placeholder={text.passwordPlaceholder}
              value={confirmPassword}
              onChange={e => setConfirmPassword(e.target.value)}
            />
            <Typography color="grey" variant="bodyS">
              {text.passwordRule}
            </Typography>
            <Button label={text.buttonLabel} width="100%" type="submit" />{' '}
          </form>
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

export default CreateAccountPage;
