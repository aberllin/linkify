import { useSetRecoilState } from 'recoil';
import { v4 as uuidv4 } from 'uuid';
import { toastsState } from '~/state/toasts';

export const useToast = () => {
  const setToasts = useSetRecoilState(toastsState);

  const addToast = (message: string, level: 'error' | 'success' | 'info') => {
    const id = uuidv4();
    setToasts(prevToasts => [...prevToasts, { id, message, level }]);

    // Automatically remove the toast after 3 seconds
    setTimeout(() => {
      setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
    }, 3000);
  };

  return { addToast };
};
