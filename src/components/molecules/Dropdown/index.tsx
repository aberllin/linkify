import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';
import Icon, { IconName } from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';

export type Option<T> = {
  icon: IconName;
  label: string;
  value: T;
};

type DropdownProps<T> = {
  label?: string;
  options: Array<Option<T>>;
  placeholder?: string;
  selectedOption?: Option<T>;
  onChange: (option: Option<T>) => void;
};

const Dropdown = <T,>({
  label,
  options,
  placeholder = 'Choose an option',
  selectedOption,
  onChange,
}: DropdownProps<T>) => {
  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <Container ref={dropdownRef}>
      {label && (
        <Label color="darkGrey" variant="bodyS">
          {label}
        </Label>
      )}
      <DropdownHeader onClick={() => setIsOpen(!isOpen)} $isOpen={isOpen}>
        <DropdownLabel>
          {selectedOption ? (
            <>
              <Icon name={selectedOption.icon} />{' '}
              <Typography variant="bodyM">{selectedOption.label}</Typography>
            </>
          ) : (
            <Placeholder>{placeholder}</Placeholder>
          )}
        </DropdownLabel>
        <Icon name={isOpen ? 'chevron_up' : 'chevron_down'} />
      </DropdownHeader>
      {isOpen && (
        <DropdownList>
          {options.map(option => (
            <DropdownItem
              key={option.value as string}
              onClick={() => {
                onChange(option);
                setIsOpen(false);
              }}
              selected={option.value === selectedOption?.value}
            >
              <Icon name={option.icon} /> {option.label}
            </DropdownItem>
          ))}
        </DropdownList>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;
  margin: 0 auto;
`;

const Label = styled(Typography)(
  ({ theme }) => css`
    display: block;
    margin-bottom: ${theme.space('xxxs')};
  `,
);

const DropdownHeader = styled.div<{ $isOpen: boolean }>(
  ({ theme, $isOpen }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: ${theme.space('s')} ${theme.space('m')};
    border: 1px solid ${$isOpen ? theme.color('purple') : theme.color('border')};
    height: 46px;
    border-radius: ${theme.border('s')};
    cursor: pointer;
    transition: all 0.3s ease;

    &:hover {
      border-color: ${({ theme }) => theme.color('purple')};
    }
    ${$isOpen &&
    css`
      box-shadow: 0 0 32px 0 rgba(99, 60, 255, 0.25);
    `}
  `,
);

const DropdownLabel = styled.span(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space('xxs')};
    color: ${({ theme }) => theme.color('darkGrey')};
  `,
);

const Placeholder = styled.span`
  color: ${({ theme }) => theme.color('grey')};
`;

const DropdownList = styled.div(
  ({ theme }) => css`
    position: absolute;
    width: 100%;
    top: 100%;
    left: 0;
    background-color: ${theme.color('white')};
    border: 1px solid ${theme.color('border')};
    border-radius: ${theme.border('s')};
    z-index: 1000;
    max-height: 200px;
    overflow-y: auto;
    margin-top: ${theme.space('xxs')};
  `,
);

const DropdownItem = styled.div<{ selected: boolean }>(
  ({ theme, selected }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space('xxs')};
    margin: 0 ${theme.space('base')};
    padding: ${theme.space('s')} 0;
    cursor: pointer;
    color: ${selected ? theme.color('purple') : theme.color('grey')};
    transition: all 0.3s ease;
    font-weight: ${theme.fontWeight('regular')};

    &:not(:last-child) {
      border-bottom: 1px solid ${theme.color('border')};
      border-width: 80%;
    }

    &:hover {
      color: ${theme.color('purple')};
    }
  `,
);

export default Dropdown;
