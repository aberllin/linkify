import SaveFooter from '~/components/organisms/SaveFooter';
import { useRecoilState, useRecoilValue } from 'recoil';
import currentSectionState from '~/state/currentSection';
import Typography from '~/components/atoms/Typography';
import { css, styled } from 'styled-components';
import LinksBlock from '~/components/organisms/LinksBlock';
import linksState from '~/state/links';
import { LinkItemProps } from '~/components/organisms/LinksBlock/components/LinkItemBlock';
import { v4 as uuidv4 } from 'uuid';
import PreviewBlock from '~/components/organisms/PreviewBlock';
import isMobileBreakpoint from '~/utils/isMobileBreakpoint';
import { useEffect } from 'react';
import profileDetails from '~/state/profileDetails';
import ProfileBlock from '~/components/organisms/ProfileBlock';

const getEmptyLink = (): LinkItemProps => ({
  key: uuidv4(),
  url: '',
  type: 'github',
});

const text = {
  profile: {
    heading: 'Profile Details',
    description: 'Add your details to create a personal touch to your profile.',
  },
  links: {
    heading: 'Customize your links',
    description:
      ' Add/edit/remove links below and then share all your profiles with the world!',
  },
};

const LinkBuilder: React.FC = () => {
  const currentSection = useRecoilValue(currentSectionState);
  const [links, setLinks] = useRecoilState(linksState);
  const _profileDetails = useRecoilValue(profileDetails);

  useEffect(() => {
    const fetchLinks = async () => {
      try {
        const response = await fetch('/api/links', {
          method: 'GET',
          credentials: 'include', // Include cookies for authentication
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Failed to fetch links');
        }

        const data = await response.json();
        setLinks(data);
        // setLoading(false);
      } catch (error: any) {
        console.log(error.message);
        // setLoading(false);
      }
    };

    fetchLinks();
  }, []);

  const onAddNew = () => setLinks(prev => [...prev, getEmptyLink()]);

  const onDelete = (key: string) =>
    setLinks(prev => prev.filter(link => link.key !== key));

  const onSave = async () => {
    const formattedLinks = links.map(link => ({
      label: 'Link', // or whatever label you want
      type: link.type,
      url: link.url,
    }));

    console.log('Saving links:', formattedLinks);

    try {
      const response = await fetch('/api/links', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ links: formattedLinks }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to save links');
      }

      const data = await response.json();
      console.log('Links saved successfully:', data);
      // Maybe update your local state here if needed
    } catch (error) {
      console.error('Error saving links:', error);
      // Handle the error, maybe show a message to the user
    }
  };

  const isMobile = isMobileBreakpoint();

  return (
    <Container>
      {!isMobile && (
        <PageBlock $flex={4}>
          <PreviewBlock links={links} />
        </PageBlock>
      )}
      <PageBlock $flex={6}>
        <PageContent>
          <Header>
            <Typography variant="h1">{text[currentSection].heading}</Typography>
            <Typography color="grey" variant="bodyM">
              {text[currentSection].description}
            </Typography>
          </Header>
          {currentSection === 'links' ? (
            <LinksBlock
              links={links}
              onAddLink={onAddNew}
              onDelete={onDelete}
            />
          ) : (
            <ProfileBlock />
          )}
        </PageContent>
        <SaveFooter onSave={onSave} />
      </PageBlock>
    </Container>
  );
};

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.space('l')};
    margin: ${theme.space('l')} 0 0 0;
  `,
);

const PageContent = styled.div(
  ({ theme }) => css`
    padding: ${theme.space('xxxl')};
  `,
);

const PageBlock = styled.div<{ $flex: number }>(
  ({ theme, $flex }) => css`
    flex: ${$flex};
    background-color: ${theme.color('white')};
    border-radius: ${theme.border('base')};
    width: 100%;
  `,
);

const Header = styled.div(
  () => css`
    display: flex;
    flex-direction: column;
  `,
);

export default LinkBuilder;
