import { useRecoilState } from 'recoil';
import { styled, css } from 'styled-components';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';
import Dropdown from '~/components/molecules/Dropdown';
import Input from '~/components/molecules/Input';
import { linkData, linkOptions, type LinkType } from '~/constants';
import { linkByKeyState } from '~/state/links';

export type LinkItemProps = {
  key: string;
  url: string;
  type: LinkType;
};

export type Props = {
  onRemove: () => void;
  index: number;
  linkKey: string;
};

const LinkItemBlock: React.FC<Props> = ({ index, linkKey, onRemove }) => {
  const [currentLink, setCurrentLink] = useRecoilState(linkByKeyState(linkKey));
  const placeholder = linkData[currentLink?.type || 'github'].placeholder;

  const onLinkChange = (
    key: LinkItemProps['url'] | LinkItemProps['type'],
    value: string,
  ) =>
    setCurrentLink(prev => {
      if (!prev) return prev;
      return { ...prev, [key]: value };
    });

  return (
    <Container>
      <Header>
        <DragAndDrop>
          <Icon name="drag-and-drop" />
          <Typography variant="label" color="grey">
            Link #{index + 1}
          </Typography>
        </DragAndDrop>
        <Typography variant="bodyM" onClick={onRemove}>
          Remove
        </Typography>
      </Header>
      <Dropdown
        label="Platform"
        options={linkOptions}
        selectedOption={linkOptions.find(
          link => link.value === currentLink?.type,
        )}
        onChange={option => onLinkChange('type', option.value)}
      />
      <Input
        label="Link"
        placeholder={placeholder}
        value={currentLink?.url}
        onChange={e => onLinkChange('url', e.target.value)}
      />
    </Container>
  );
};

const DragAndDrop = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.space('xs')};
  `,
);

const Header = styled.div(
  () => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  `,
);

const Container = styled.div(
  ({ theme }) => css`
    padding: ${theme.space('xl')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: ${theme.space('l')};
    background-color: ${theme.color('lightGrey')};
    width: 100%;
    border-radius: ${theme.border('base')};
  `,
);

export default LinkItemBlock;
