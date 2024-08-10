import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import styled from 'styled-components';
import { toastsState } from '~/state/toasts';

const Toast: React.FC = () => {
  const [toasts, setToasts] = useRecoilState(toastsState);

  useEffect(() => {
    if (toasts.length > 0) {
      const timer = setTimeout(() => {
        removeToast(toasts[0].id);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [toasts]);

  const removeToast = (id: string) => {
    setToasts(prevToasts => prevToasts.filter(toast => toast.id !== id));
  };

  return (
    <ToastContainer>
      {toasts.map(toast => (
        <ToastWrapper key={toast.id} level={toast.level}>
          <ToastMessage>{toast.message}</ToastMessage>
          <CloseButton onClick={() => removeToast(toast.id)}>✕</CloseButton>
        </ToastWrapper>
      ))}
    </ToastContainer>
  );
};

const ToastContainer = styled.div`
  position: fixed;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 9999;
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const ToastWrapper = styled.div<{ level: 'error' | 'success' | 'info' }>`
  background-color: ${({ level }) =>
    level === 'success'
      ? 'rgba(76, 175, 80, 0.85)'
      : level === 'error'
        ? 'rgba(244, 67, 54, 0.85)'
        : 'rgba(33, 150, 243, 0.85)'};
  color: #ffffff;
  padding: 10px 20px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
  box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.3);
`;

const ToastMessage = styled.div`
  font-size: 16px;
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #ffffff;
  font-size: 20px;
  cursor: pointer;
  padding: 0;
  margin: 0;
`;

export default Toast;
