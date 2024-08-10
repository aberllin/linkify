const text = {
  errorGeneral: 'An error occurred during registration. Please try again.',
};

type Args = {
  email: string;
  password: string;
};

type ReturnType = {
  error: string | null;
  data: {
    user: {
      email: string;
      id: string;
    };
  } | null;
};

const login = async ({ email, password }: Args): Promise<ReturnType> => {
  let error = null;
  let data: ReturnType['data'] | null = null;

  try {
    const response = await fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ email, password }),
    });

    if (!response.ok) {
      error = text.errorGeneral;
    } else {
      const responseData = await response.json();

      data = {
        user: {
          email: responseData.user.email,
          id: responseData.user._id,
        },
      };
    }
  } catch (e) {
    // Ideally send it to some bug reporter
    error = text.errorGeneral;
  }

  return { error, data };
};

export default login;
