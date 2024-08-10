import { atom } from 'recoil';

export type ProfileDetails = {
  firstName?: string;
  lastName?: string;
  email: string;
  image?: string;
  userId: string;
};

const profileDetails = atom<ProfileDetails | null>({
  key: 'profileDetails',
  default: null,
});

export default profileDetails;
