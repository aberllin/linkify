import styled, { css } from 'styled-components';
import { useRecoilValue } from 'recoil';
import currentPageState from '~/state/currentPage';
import NavigationBar from '~/components/organisms/NavigationBar';
import LinkBuilder from '~/components/pages/link-builder';
import Preview from '~/components/pages/preview';
import { useAuth } from '~/hooks/useAuth';
import Toast from '~/components/molecules/Toast';

export default function Dashboard() {
  const { isAuthenticated, isLoading } = useAuth();

  const currentPage = useRecoilValue(currentPageState);
  const isPreview = currentPage === 'preview';

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return null; // The user will be redirected by the useAuth hook
  }
  return (
    <Container>
      {isPreview && <PreviewBackground />}
      <MainContent>
        <NavigationBar />
        {currentPage === 'links' ? <LinkBuilder /> : <Preview />}
      </MainContent>
      <Toast />
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
