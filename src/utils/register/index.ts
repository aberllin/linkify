const text = {
  errorGeneral: 'An error occurred during registration. Please try again.',
};

type Args = {
  email: string;
  username: string;
  password: string;
};

type ReturnType = {
  error: string | null;
  data: {
    user: {
      email: string;
      username: string;
      id: string;
    };
  };
};

const register = async ({
  email,
  username,
  password,
}: Args): Promise<ReturnType> => {
  let error = null;
  const response = await fetch('/api/register', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    credentials: 'include',
    body: JSON.stringify({ email, username, password }),
  });

  if (!response.ok) {
    // Ideally send it to some bug reporter
    // const errorData = await response.json();
    error = text.errorGeneral;
  }

  const data = await response.json();

  const userData: ReturnType['data']['user'] = {
    email: data.user.email,
    username: data.user.username,
    id: data.user._id,
  };

  return { error, data: { user: userData } };
};

export default register;
