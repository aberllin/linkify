import type { ProfileDetails } from '~/state/profileDetails';

const text = {
  errorGeneral: 'An error occurred while saving. Please try again.',
};

type Args = {
  profile: ProfileDetails;
};

type ReturnType = {
  error: string | null;
  data: {
    profile: ProfileDetails;
  };
};

const saveProfile = async ({ profile }: Args): Promise<ReturnType> => {
  let error = null;

  const response = await fetch('/api/profile', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify(profile),
  });
  if (!response.ok) {
    error = text.errorGeneral;
  }

  const responseData = await response.json();
  const convertedProfile: ProfileDetails = {
    email: responseData.email,
    firstName: responseData.firstName,
    lastName: responseData.lastName,
    image: responseData.image,
    userId: responseData.userId,
  };
  const data: ReturnType['data'] = { profile: convertedProfile };

  return { error, data };
};

export default saveProfile;
