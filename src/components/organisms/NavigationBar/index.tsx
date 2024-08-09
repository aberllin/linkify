import { useRecoilState } from 'recoil';
import { styled, css } from 'styled-components';
import Button from '~/components/atoms/Button';
import Icon from '~/components/atoms/Icon';
import type { IconName } from '~/components/atoms/Icon';
import Logo from '~/components/atoms/Logo';
import Tabs from '~/components/organisms/Tabs';
import currentPageState from '~/state/currentPage';
import currentSectionState, { type Section } from '~/state/currentSection';

import isMobileBreakpoint from '~/utils/isMobileBreakpoint';

const text = {
  preview: 'Preview',
};

const tabs: Array<{ key: Section; label: string; icon: IconName }> = [
  { key: 'links', label: 'Links', icon: 'link' },
  { key: 'profile', label: 'Profile Details', icon: 'profile-details-header' },
];

const NavigationBar: React.FC = () => {
  const [currentPage, setCurrentPage] = useRecoilState(currentPageState);
  const [currentSection, setCurrentSection] =
    useRecoilState(currentSectionState);
  const isMobile = isMobileBreakpoint();

  return (
    <Container>
      {currentPage === 'links' ? (
        <>
          <Logo size={isMobile ? 'small' : 'large'} />
          <Tabs
            tabs={tabs}
            currentSection={currentSection}
            onTabClick={key => {
              setCurrentSection(key);
            }}
          />
          <Button
            appearance="secondary"
            label={isMobile ? <Icon name="preview-header" /> : text.preview}
            onClick={() => setCurrentPage('preview')}
          />
        </>
      ) : (
        <>
          <Button
            label="Back to editor"
            appearance="secondary"
            onClick={() => setCurrentPage('links')}
          />
          <Button label="Share link" />
        </>
      )}
    </Container>
  );
};

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: ${theme.space('m')};
    border-radius: ${theme.border('base')};
    background-color: ${theme.color('white')};
  `,
);

export default NavigationBar;
