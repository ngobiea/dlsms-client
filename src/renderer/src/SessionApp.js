import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import {  useDispatch } from 'react-redux';
import ClassSessionSetup from './pages/SessionPages/ClassSessionSetup';
import ClassSessionPage from './pages/SessionPages/ClassSessionPage';
import SessionRulesPage from './pages/SessionPages/SessionRulesPage';
import VerificationPage from './pages/ExamSessionPages/VerificationPage';
import TitleNav from './components/TitleNav';
import FaceApi from './utils/face/FaceApi';
import { socket } from './context/realtimeContext';
import { setStudentImages } from './store';

const accountType = JSON.parse(localStorage.getItem('accountType'));
console.log(accountType);
const SessionApp = () => {
  const dispatch = useDispatch();


  useEffect(() => {
    if (accountType === 'student') {
      socket.emit('studentImages', ({ images }) => {
        console.log(images);
        dispatch(setStudentImages(images));
        FaceApi.loadRecognitionModels();
      });
    }
  }, []);
  return (
    <>
      <TitleNav />
      <Routes>
        <Route
          path="/"
          element={
            accountType === 'tutor' ? (
              <Navigate to="/setup" />
            ) : (
              <Navigate to="/rules" />
            )
          }
        />
        <Route path="setup" element={<ClassSessionSetup />} />
        <Route path="rules" element={<SessionRulesPage />} />
        <Route path="verify" element={<VerificationPage />} />
        <Route path="session" element={<ClassSessionPage />} />
      </Routes>
    </>
  );
};

export default SessionApp;
