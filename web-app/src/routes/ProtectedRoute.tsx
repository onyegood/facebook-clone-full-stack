import React from 'react';
import { useTypedSelector } from '../hooks/useSelectorHook';
import { Outlet } from 'react-router';
import LoginPage from '../pages/auth';

const ProtectedRoute: React.FC<{}> = () => {
  const { user } = useTypedSelector((state) => state.users);
  return user ? <Outlet /> : <LoginPage />;
};

export default ProtectedRoute;
