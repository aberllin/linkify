import { styled, css } from 'styled-components';
import Button from '~/components/atoms/Button';

type Props = {
  onSave: () => void;
  loading: boolean;
};
const SaveFooter: React.FC<Props> = ({ onSave, loading }) => (
  <Container>
    <Button onClick={onSave} label={loading ? 'Saving...' : 'Save'} />
  </Container>
);

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: flex-end;
    border-bottom-left-radius: ${theme.border('base')};
    border-bottom-right-radius: ${theme.border('base')};
    background-color: ${theme.color('white')};
    padding: 24px 40px;
    border-top: 1px solid ${theme.color('border')};
  `,
);

export default SaveFooter;
