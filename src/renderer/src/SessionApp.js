import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ClassSessionSetup from './pages/SessionPages/ClassSessionSetup';
import ClassSession from './pages/SessionPages/ClassSession';
import TitleNav from './components/TitleNav';
const SessionApp = () => {
  
  return (
    <>
      <TitleNav />
      <Routes>
        <Route path="/" element={<ClassSessionSetup />} />
        <Route path=":sessionId" element={<ClassSession />} />
      </Routes>
    </>
  );
};

export default SessionApp;
