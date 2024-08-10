import React, { useCallback, useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import SaveFooter from '~/components/organisms/SaveFooter';
import Typography from '~/components/atoms/Typography';
import LinksBlock from '~/components/organisms/LinksBlock';
import PreviewBlock from '~/components/organisms/PreviewBlock';
import ProfileBlock from '~/components/organisms/ProfileBlock';
import currentSectionState from '~/state/currentSection';
import linksState from '~/state/links';
import profileDetails from '~/state/profileDetails';
import saveLinks from '~/utils/saveLinks';
import getLinks from '~/utils/getLinks';
import saveProfile from '~/utils/saveProfile';
import isMobileBreakpoint from '~/utils/isMobileBreakpoint';
import { LinkItemProps } from '~/components/organisms/LinksBlock/components/LinkItemBlock';
import { v4 as uuidv4 } from 'uuid';
import { css, styled } from 'styled-components';
import { useToast } from '~/hooks/useToast';

const getEmptyLink = (): LinkItemProps => ({
  id: uuidv4(),
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
  successMessage: 'Your changes have been successfully saved!',
};

const LinkBuilder: React.FC = () => {
  const currentSection = useRecoilValue(currentSectionState);
  const [links, setLinks] = useRecoilState(linksState);
  const [profile, setProfile] = useRecoilState(profileDetails);
  const [loading, setLoading] = useState(false);
  const { addToast } = useToast();

  const isMobile = isMobileBreakpoint();

  const handleSetToastMessage = useCallback(
    (level: 'info' | 'error' | 'success', msg: string) => {
      addToast(msg, level);
      setLoading(false);
    },
    [],
  );

  useEffect(() => {
    const getData = async () => {
      const { data, error } = await getLinks();

      if (error) {
        return handleSetToastMessage('error', error);
      }

      if (data) {
        setLinks(data.links);
      }
    };

    getData();
  }, [setLinks, handleSetToastMessage]);

  const onAddNew = useCallback(() => {
    setLinks(prev => [...prev, getEmptyLink()]);
  }, [setLinks]);

  const onDelete = useCallback(
    (linkId: string) => {
      setLinks(prev => prev.filter(link => link.id !== linkId));
    },
    [setLinks],
  );

  const onSaveLinks = useCallback(async () => {
    const { error, data } = await saveLinks({ links });

    if (error) {
      return handleSetToastMessage('error', error);
    }

    if (data) {
      setLinks(data.links);
    }
  }, [links, setLinks, handleSetToastMessage]);

  const onSaveProfile = useCallback(async () => {
    const { data, error } = await saveProfile({ profile });

    if (error) {
      return handleSetToastMessage('error', error);
    }

    if (data) {
      setProfile(data.profile);
    }
  }, [profile, setProfile, handleSetToastMessage]);

  const onSave = useCallback(async () => {
    setLoading(true);
    await Promise.all([onSaveProfile(), onSaveLinks()]);
    setLoading(false);
    handleSetToastMessage('success', text.successMessage);
  }, [onSaveProfile, onSaveLinks, handleSetToastMessage]);

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
        <SaveFooter onSave={onSave} loading={loading} />
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
