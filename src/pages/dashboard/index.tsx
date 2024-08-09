import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import currentPageState from '~/state/currentPage';
import LinkBuilder from '../link-builder';
import Preview from '../preview';
import NavigationBar from '~/components/organisms/NavigationBar';

export default function Dashboard() {
  const currentPage = useRecoilValue(currentPageState);
  const isPreview = currentPage === 'preview';
  return (
    <Container>
      {isPreview && <PreviewBackground />}
      <MainContent>
        <NavigationBar />
        {currentPage === 'links' ? <LinkBuilder /> : <Preview />}
      </MainContent>
    </Container>
  );
}

const MainContent = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    display: flex;
    flex-direction: column;
    padding: ${theme.space('l')};
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

const Container = styled.div(
  ({ theme }) => css`
    background: ${theme.color('lightGrey')};
  `,
);
