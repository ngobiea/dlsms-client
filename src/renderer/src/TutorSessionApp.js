import React from 'react';
import { Routes, Route } from 'react-router-dom';

import TitleNav from './components/TitleNav';
import TutorSetup from './pages/ExamSessionPages/TutorSetup';
import TutorSession from './pages/ExamSessionPages/TutorSession';
import NoConnection from './pages/NoConnection';
const TutorSessionApp = () => {
  const { notification, downloadProgress, isOnline } = useSelector(
    (state) => state.app
  );
  return (
    <>
      <TitleNav />
      {isOnline ? (
        <Routes>
          <Route path="/" element={<TutorSetup />} />
          <Route path="session" element={<TutorSession />} />
          <Route />
        </Routes>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

export default TutorSessionApp;
