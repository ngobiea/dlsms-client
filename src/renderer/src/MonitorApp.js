import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TitleNav from './components/TitleNav';
import MonitorPage from './pages/MonitorPages/MonitorPage';
import ExamSessionSetup from './pages/MonitorPages/ExamSessionSetup';
import ExamSessionContext from './context/ExamSessionContext';
const examSessionId = localStorage.getItem('examSessionId');

const MonitorApp = () => {
  const { socket, loadDevice } = useContext(ExamSessionContext);
  useEffect(() => {
    socket.emit('examSession', { examSessionId }, ({ rtpCapabilities }) => {
      loadDevice(rtpCapabilities);
    });
  }, []);
  const { isDeviceSet } = useSelector((state) => state.session);
  return (
    <>
      <TitleNav />
      {isDeviceSet && (
        <Routes>
          <Route path="/" element={<ExamSessionSetup />} />
          <Route path="/monitor" element={<MonitorPage />} />
        </Routes>
      )}
    </>
  );
};

export default MonitorApp;
