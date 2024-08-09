import React, { useState, ChangeEvent } from 'react';
import styled, { css } from 'styled-components';
import Icon from '~/components/atoms/Icon';
import Typography from '~/components/atoms/Typography';
import isMobileBreakpoint from '~/utils/isMobileBreakpoint';

type Props = {
  initialImage?: string;
  onImageUpload?: (src: string) => void;
  label: string;
};

const ImageUploader: React.FC<Props> = ({
  initialImage,
  onImageUpload,
  label,
}) => {
  const [image, setImage] = useState<string | null>(initialImage || null);
  const isMobile = isMobileBreakpoint();

  const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      if (onImageUpload) {
        onImageUpload(imageUrl);
      }
    }
  };

  return (
    <Container $isMobile={isMobile}>
      <Typography color="grey" variant="bodyM">
        {label}
      </Typography>
      <Inner $isMobile={isMobile}>
        <UploadContainer>
          <Input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            id="imageUpload"
          />
          <Label htmlFor="imageUpload">
            {image ? (
              <ImageWrapper>
                <Image src={image} alt="Uploaded Image" />
                <Overlay>
                  <UploadIcon name="upload-image" />
                  <Typography variant="bodyM" color="white">
                    Change Image
                  </Typography>
                </Overlay>
              </ImageWrapper>
            ) : (
              <UploadPlaceholder>
                <Icon name="upload-image" />
                <Typography variant="h2" color="purple">
                  + Upload Image
                </Typography>
              </UploadPlaceholder>
            )}
          </Label>
        </UploadContainer>
        <Typography variant="bodyS" color="grey">
          Image must be below 1024x1024px. Use PNG or JPG format.
        </Typography>
      </Inner>
    </Container>
  );
};

const Inner = styled.div<{ $isMobile?: boolean }>(
  ({ theme, $isMobile = false }) => css`
    display: flex;
    align-items: ${$isMobile ? 'flex-start' : 'center'};
    flex-direction: ${$isMobile ? 'column' : 'row'};
    gap: ${theme.space('m')};
  `,
);

const UploadIcon = styled(Icon)(
  ({ theme }) => css`
    height: ${theme.space('xxxl')};
    width: ${theme.space('xxxl')};
  `,
);

const Container = styled.div<{ $isMobile?: boolean }>(
  ({ theme, $isMobile = false }) => css`
    display: flex;
    align-items: ${$isMobile ? 'flex-start' : 'center'};
    justify-content: space-between;
    flex-direction: ${$isMobile ? 'column' : 'row'};
    gap: ${theme.space('m')};
    border-radius: ${theme.border('base')};
    width: 100%;
  `,
);

const UploadContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  display: none;
`;

const Label = styled.label`
  cursor: pointer;
`;

const UploadPlaceholder = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 190px;
    height: 190px;
    border-radius: ${theme.space('s')};
    background-color: ${theme.color('lightPurple')};
    padding: ${theme.space('m')};
    text-align: center;
  `,
);

const ImageWrapper = styled.div`
  position: relative;
`;

const Image = styled.img`
  width: 150px;
  height: 150px;
  border-radius: ${props => props.theme.space('s')};
  object-fit: cover;
`;

const Overlay = styled.div(
  ({ theme }) => css`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: ${theme.space('s')};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    opacity: 0;
    transition: opacity 0.3s;
    &:hover {
      opacity: 1;
    }
  `,
);

export default ImageUploader;
