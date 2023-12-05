import React, { useEffect, useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import ClassSessionSetup from './pages/SessionPages/ClassSessionSetup';
import ClassSessionPage from './pages/SessionPages/ClassSessionPage';
import SessionRulesPage from './pages/SessionPages/SessionRulesPage';
import VerificationPage from './pages/ExamSessionPages/VerificationPage';
import TitleNav from './components/TitleNav';
import FaceApi from './utils/face/FaceApi';
import { socket } from './context/realtimeContext';
import { setStudentImages } from './store';
import Skeleton from './pages/SessionPages/Skeleton';
import CloseWindow from './pages/ExamSessionPages/CloseWindow';
import NoConnection from './pages/NoConnection';
const accountType = JSON.parse(localStorage.getItem('accountType'));
const classSessionId = localStorage.getItem('sessionId');

console.log(accountType);
const SessionApp = () => {
  const [message, setMessage] = useState('');

  const dispatch = useDispatch();
  const { isModelsLoaded } = useSelector((state) => {
    return state.session;
  });
  const { notification, downloadProgress, isOnline } = useSelector(
    (state) => state.app
  );

  useEffect(() => {
    if (accountType === 'student') {
      socket.emit('classStatus', { classSessionId }, ({ status }) => {
        console.log(status);
        if (status === 'ongoing' || status === 'started') {
          socket.emit('studentImages', ({ images }) => {
            console.log(images);
            dispatch(setStudentImages(images));
            FaceApi.loadRecognitionModels();
            FaceApi.status = status;
          });
        } else if (status === 'ended') {
          setMessage('This class session has ended');
        } else if (status === 'pending') {
          setMessage('This class has not started yet');
        } else if (status === 'invalid') {
          setMessage('This class session is invalid');
        }
      });
    }
  }, []);
  return (
    <>
      <TitleNav />
      {isOnline ? (
        <>
          {accountType !== 'tutor' && message !== '' ? (
            <CloseWindow message={message} />
          ) : (
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
              <Route
                path="rules"
                element={isModelsLoaded ? <SessionRulesPage /> : <Skeleton />}
              />
              <Route path="verify" element={<VerificationPage />} />
              <Route path="session" element={<ClassSessionPage />} />
            </Routes>
          )}
        </>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

export default SessionApp;
