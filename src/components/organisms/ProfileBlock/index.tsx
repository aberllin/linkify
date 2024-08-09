import { useRecoilState } from 'recoil';
import styled, { css } from 'styled-components';
import Typography from '~/components/atoms/Typography';
import ImageUploader from '~/components/molecules/ImageUploader';
import Input from '~/components/molecules/Input';
import profileDetailsState, {
  type ProfileDetails,
} from '~/state/profileDetails';

const ProfileBlock: React.FC = () => {
  const [profileDetails, setProfileDetails] =
    useRecoilState(profileDetailsState);

  const onChange = (key: keyof ProfileDetails, value: string) => {
    setProfileDetails(prev => {
      if (!prev) return prev;

      return { ...prev, [key]: value };
    });
  };

  return (
    <Container>
      <BlockWrapper>
        <ImageUploader
          initialImage={profileDetails?.image}
          label="Profile picture"
          onImageUpload={imageUrl => onChange('image', imageUrl)}
        />
      </BlockWrapper>
      <BlockWrapper>
        <InputContainer>
          <Typography color="grey" variant="bodyM">
            First name&#42;
          </Typography>
          <Input value={profileDetails?.firstName} />
        </InputContainer>
        <InputContainer>
          <Typography color="grey" variant="bodyM">
            Last name&#42;
          </Typography>
          <Input value={profileDetails?.lastName} />
        </InputContainer>
        <InputContainer>
          <Typography color="grey" variant="bodyM">
            Email&#42;
          </Typography>
          <Input value={profileDetails?.email} />
        </InputContainer>
      </BlockWrapper>
    </Container>
  );
};

const BlockWrapper = styled.div(
  ({ theme }) => css`
    background-color: ${theme.color('lightGrey')};
    padding: ${theme.space('l')};
    border-radius: ${theme.border('base')};
    display: flex;
    flex-direction: column;
    gap: ${theme.space('m')};
  `,
);

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 14px;
`;

const Container = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    gap: ${theme.space('m')};
  `,
);

export default ProfileBlock;
