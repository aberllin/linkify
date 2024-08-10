import { styled, css } from 'styled-components';
import Button from '~/components/atoms/Button';
import Illustration from '~/components/atoms/Illustration';
import Typography from '~/components/atoms/Typography';
import LinkItemBlock, { LinkItemProps } from './components/LinkItemBlock';

type Props = {
  onAddLink: () => void;
  links: Array<LinkItemProps>;
  onDelete: (linkId: string) => void;
};

const LinksBlock: React.FC<Props> = ({ onAddLink, links, onDelete }) => (
  <Container>
    <Button
      label="+ Add new link"
      appearance="secondary"
      width="100%"
      onClick={onAddLink}
    />

    {links.length === 0 && (
      <EmptyLinksBlock>
        <div>
          <Illustration name="empty" />
        </div>
        <Typography variant="h1">Let’s get you started</Typography>
        <Description color="grey" variant="bodyM">
          Use the “Add new link” button to get started. Once you have more than
          one link, you can reorder and edit them. We’re here to help you share
          your profiles with everyone!
        </Description>
      </EmptyLinksBlock>
    )}
    {links.length > 0 && (
      <Links>
        {links.map((link, index) => (
          <LinkItemBlock
            key={link.id}
            linkKey={link.id}
            index={index}
            onRemove={() => onDelete(link.id)}
          />
        ))}
      </Links>
    )}
  </Container>
);

const Links = styled.div(
  ({ theme }) => css`
    width: 100%;
    display: flex;
    gap: ${theme.space('xl')};
    flex-direction: column;
    max-height: 500px;
    overflow-y: scroll;
    height: 100vh;
  `,
);

const EmptyLinksBlock = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background: ${theme.color('lightGrey')};
    gap: ${theme.space('l')};
    padding: ${theme.space('xxl')};
    border-radius: ${theme.border('base')};
  `,
);

const Description = styled(Typography)`
  text-align: center;
`;

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    gap: ${theme.space('xl')};
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    margin-top: ${theme.space('xxxl')};
  `,
);

export default LinksBlock;
