import React from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/AuthenticationPages/LoginPage';
import SignupPage from './pages/AuthenticationPages/SignupPage';
const AccountApp = () => {

  return (
    <Routes>
      <Route path="/signup" element={<SignupPage />}></Route>
      <Route path="/" element={<LoginPage />}></Route>
    </Routes>
  );
};

export default AccountApp;
