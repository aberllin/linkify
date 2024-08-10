import { atom } from 'recoil';

export type ProfileDetails = {
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  userId: string;
};

const profileDetails = atom<ProfileDetails>({
  key: 'profileDetails',
  default: { email: '', userId: '' },
});

export default profileDetails;
