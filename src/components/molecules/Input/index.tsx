import React, { type InputHTMLAttributes } from 'react';
import styled, { css } from 'styled-components';
import Icon, { IconName } from '../../atoms/Icon';
import Typography from '~/components/atoms/Typography';

type Props = InputHTMLAttributes<HTMLInputElement> & {
  label?: React.ReactNode;
  errors?: Array<string | null>;
  icon?: IconName;
};

const Input: React.FC<Props> = ({
  label,
  errors,
  icon,
  placeholder,
  ...rest
}) => {
  const hasErrors = errors && errors.length > 0;
  return (
    <Container>
      {label && (
        <Typography color={hasErrors ? 'error' : 'darkGrey'} variant="bodyS">
          {label}
        </Typography>
      )}
      <InputWrapper>
        {icon && (
          <IconWrapper>
            <Icon name={icon} />
          </IconWrapper>
        )}
        <InputElement
          $hasErrors={hasErrors}
          $hasIcon={!!icon}
          {...rest}
          placeholder={hasErrors ? undefined : placeholder}
        />
        {hasErrors && errors[0] && <ErrorMessage>{errors[0]}</ErrorMessage>}
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space('xxxs')};
    width: 100%;
  `,
);

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
`;

const IconWrapper = styled.div`
  position: absolute;
  left: ${props => props.theme.space('base')};
  display: flex;
  align-items: center;
`;

const ErrorMessage = styled.span`
  position: absolute;
  right: ${props => props.theme.space('base')};
  color: ${props => props.theme.color('error')};
  font-size: ${props => props.theme.space('base')};
`;

const InputElement = styled.input<{ $hasErrors?: boolean; $hasIcon?: boolean }>(
  ({ theme, $hasErrors, $hasIcon }) => css`
    width: 100%;
    border: 1px solid
      ${$hasErrors ? theme.color('error') : theme.color('border')};
    color: ${theme.color('darkGrey')};
    border-radius: ${theme.border('s')};
    padding: ${theme.space('base')};
    padding-left: ${$hasIcon ? theme.space('xxxl') : theme.space('base')};
    height: ${theme.space('xxxxl')};
    font-size: ${theme.space('m')};
    outline: none;
    transition:
      border-color 0.2s,
      box-shadow 0.2s;

    &::placeholder {
      color: ${theme.color('grey')};
      font-weight: ${theme.fontWeight('regular')};
      font-size: ${theme.space('base')};
    }

    &:focus {
      border-color: ${$hasErrors
        ? theme.color('error')
        : theme.color('purple')};
      box-shadow: 0px 0px 32px 0px
        ${$hasErrors ? 'rgba(255, 57, 57, 0.25)' : 'rgba(99, 60, 255, 0.25)'};
    }

    &:focus::placeholder {
      color: transparent;
    }
  `,
);

export default Input;
