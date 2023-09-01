import React, { useContext, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classSessionContext from './context/ClassSessionContext';
import ClassSessionSetup from './pages/SessionPages/ClassSessionSetup';
import ClassSession from './pages/SessionPages/ClassSession';
import TitleNav from './components/TitleNav';

const sessionId = localStorage.getItem('sessionId');

const SessionApp = () => {
  const { loadDevice, socket } = useContext(classSessionContext);
  const { isDeviceSet } = useSelector((state) => {
    return state.session;
  });
  useEffect(() => {
    socket.emit('createSession', { sessionId }, ({ rtpCapabilities }) => {
      loadDevice(rtpCapabilities);
    });
  }, []);
  return (
    <>
      <TitleNav />
      {isDeviceSet && (
        <Routes>
          <Route path="/" element={<ClassSessionSetup />} />
          <Route path=":sessionId" element={<ClassSession />} />
        </Routes>
      )}
    </>
  );
};

export default SessionApp;
