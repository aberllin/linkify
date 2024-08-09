import React from 'react';
import styled, { css } from 'styled-components';
import Icon, { IconName } from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';
import type { Section } from '~/state/currentSection';
import isMobileBreakpoint from '~/utils/isMobileBreakpoint';

type TabProps = {
  key: string;
  label: string;
  icon: IconName;
  isActive?: boolean;
  onClick: () => void;
};

const Tab: React.FC<TabProps> = ({ label, icon, isActive, onClick }) => {
  const isMobile = isMobileBreakpoint();
  return (
    <TabItem $isActive={isActive} onClick={onClick}>
      <Icon name={icon} />
      {!isMobile && (
        <Typography variant="h2" color={isActive ? 'purple' : 'grey'}>
          {label}
        </Typography>
      )}
    </TabItem>
  );
};

type TabsProps = {
  tabs: Array<{ label: string; icon: IconName; key: Section }>;
  currentSection: Section;
  onTabClick: (key: Section) => void;
};

const Tabs: React.FC<TabsProps> = ({
  tabs,
  currentSection = 0,
  onTabClick,
}) => (
  <TabsContainer>
    {tabs.map(tab => (
      <Tab
        key={tab.label}
        label={tab.label}
        icon={tab.icon}
        isActive={tab.key === currentSection}
        onClick={() => onTabClick(tab.key)}
      />
    ))}
  </TabsContainer>
);

const TabsContainer = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.space('m')};
  `,
);

const TabItem = styled.div<{ $isActive?: boolean }>(
  ({ theme, $isActive }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space('s')};
    padding: ${theme.space('s')} ${theme.space('xl')};
    height: 46px;
    cursor: pointer;
    border-radius: ${theme.border('s')};
    background-color: ${$isActive ? theme.color('lightPurple') : 'transparent'};
    transition:
      background-color 0.3s,
      color 0.3s;

    &:hover > span {
      color: ${theme.color('purple')};
    }
  `,
);

export default Tabs;
