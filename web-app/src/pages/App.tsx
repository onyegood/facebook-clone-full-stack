import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import LoginPage from './auth';
import ProfilePage from './profile';
import HomePage from './home';
import ProtectedRoute from '../routes/ProtectedRoute';
import PublicRoute from '../routes/PublicRoute';
import ActivateAccountPage from './home/ActivateAccountPage';
import ResetPasswordPage from './auth/reset-password';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicRoute />}>
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/register" element={<LoginPage />} />
          <Route path="/auth/forgot-password" element={<LoginPage />} />
          <Route path="/auth/reset-password" element={<ResetPasswordPage />} />
        </Route>

        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/user/profile" element={<ProfilePage />} />
          <Route
            path="/auth/activate/:token"
            element={<ActivateAccountPage />}
          />
        </Route>
        <Route path="*" element={<h1>Page not found!</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
