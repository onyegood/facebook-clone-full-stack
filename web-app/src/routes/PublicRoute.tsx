import React from 'react';
import { useTypedSelector } from '../hooks/useSelectorHook';
import { Navigate, Outlet } from 'react-router';

const PublicRoute: React.FC<{}> = () => {
  const { user } = useTypedSelector((state) => state.users);
  return user ? <Navigate to="/" /> : <Outlet />;
};

export default PublicRoute;
