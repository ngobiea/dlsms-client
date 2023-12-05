import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TitleNav from './components/TitleNav';
import TutorSetup from './pages/ExamSessionPages/TutorSetup';
import TutorSession from './pages/ExamSessionPages/TutorSession';

const TutorSessionApp = () => {
  return (
    <>
      <TitleNav />
      <Routes>
        <Route path="/" element={<TutorSetup />} />
        <Route path="session" element={<TutorSession />} />
        <Route />
      </Routes>
    </>
  );
};

export default TutorSessionApp;
