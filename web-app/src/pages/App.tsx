import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Routes, Route } from 'react-router';
import LoginPage from './auth';
import ProfilePage from './profile';
import HomePage from './home';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/auth/login" element={<LoginPage />} />
        <Route path="/auth/register" element={<LoginPage />} />
        <Route path="/auth/forgot-password" element={<LoginPage />} />
        <Route path="/auth/reset-password" element={<LoginPage />} />
        <Route path="/user/profile" element={<ProfilePage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
