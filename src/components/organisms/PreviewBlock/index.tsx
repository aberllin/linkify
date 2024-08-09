import styled, { css } from 'styled-components';
import type { LinkItemProps } from '../LinksBlock/components/LinkItemBlock';
import { linkData } from '~/constants';
import Icon from '~/components/atoms/Icon';
import { useRecoilValue } from 'recoil';
import profileDetailsState from '~/state/profileDetails';

type Props = {
  links: Array<LinkItemProps>;
};

const PreviewBlock: React.FC<Props> = ({ links }) => {
  const placeholders = new Array(5).fill(null);
  const profileDetails = useRecoilValue(profileDetailsState);

  return (
    <Container>
      <PhoneFrame>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/images/PhoneFrame.svg" alt="Phone frame" />
        <ContentBlock>
          <ProfileBlock>
            <ImagePlaceholder $image={profileDetails?.image} />
            <NamePlaceholder />
            <EmailPlaceholder />
          </ProfileBlock>
          <LinksBlock>
            {links.length > 0
              ? links.map(link => (
                  <LinkItem key={link.key} $color={linkData[link.type].color}>
                    <div>
                      <Icon name={linkData[link.type].icon} />
                      {linkData[link.type].label}
                    </div>
                    <Icon name="arrow-right" />
                  </LinkItem>
                ))
              : placeholders.map((_, index) => <PlaceholderItem key={index} />)}
          </LinksBlock>
        </ContentBlock>
      </PhoneFrame>
    </Container>
  );
};

const PhoneFrame = styled.div`
  position: relative;
  width: 320px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
`;

const LinksBlock = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space('base')};
    width: 230px;
  `,
);

const PlaceholderItem = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${theme.color('placeholder')};
    width: 100%;
    border-radius: ${theme.border('s')};
    padding: ${theme.space('m')};
    height: 44px;
  `,
);

const ProfileBlock = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: ${theme.space('base')};
  `,
);

const ImagePlaceholder = styled.div<{ $image?: string }>(
  ({ theme }) => css`
    height: 96px;
    width: 96px;
    background-color: ${theme.color('placeholder')};
    border-radius: 50%;
  `,
);

const NamePlaceholder = styled.div(
  ({ theme }) => css`
    height: 16px;
    width: 160px;
    background-color: ${theme.color('placeholder')};
    border-radius: ${theme.border('s')};
  `,
);

const EmailPlaceholder = styled.div(
  ({ theme }) => css`
    height: 8px;
    width: 72px;
    background-color: ${theme.color('placeholder')};
    border-radius: ${theme.border('s')};
  `,
);

const ContentBlock = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 53%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.space('xxxxl')};
    height: 500px;
    overflow-y: scroll;
  `,
);

const Container = styled.div(
  ({ theme }) => css`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: ${theme.space('xxxxl')} ${theme.space('xl')};
  `,
);

const LinkItem = styled.div<{ $color: string }>(
  ({ theme, $color }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: ${$color};
    width: 230px;
    border-radius: ${theme.border('s')};
    padding: ${theme.space('m')};
    color: ${theme.color('white')};
  `,
);

export default PreviewBlock;
