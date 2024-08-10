// components/withAuth.tsx
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

type AuthCheckFunction = () => Promise<boolean>;

export default function withAuth<P extends object>(
  WrappedComponent: React.ComponentType<P>,
  authCheckFn: AuthCheckFunction,
) {
  return function AuthenticatedComponent(props: P) {
    const router = useRouter();
    const [authState, setAuthState] = useState<
      'loading' | 'authenticated' | 'unauthenticated'
    >('loading');

    useEffect(() => {
      const checkAuth = async () => {
        try {
          const isAuthenticated = await authCheckFn();
          if (isAuthenticated) {
            setAuthState('authenticated');
          } else {
            setAuthState('unauthenticated');
            router.push('/login');
          }
        } catch (error) {
          console.error('Auth check failed', error);
          setAuthState('unauthenticated');
          router.push('/login');
        }
      };

      checkAuth();
    }, [router]);

    switch (authState) {
      case 'loading':
        return <div>Loading...</div>; // or a loading spinner
      case 'authenticated':
        return <WrappedComponent {...props} />;
      case 'unauthenticated':
        return null;
      default:
        return null;
    }
  };
}
