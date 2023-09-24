import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TitleNav from './components/TitleNav';
import MonitorPage from './pages/MonitorPages/MonitorPage';
import ExamSessionContext from './context/ExamSessionContext';
import CurrentStudentList from './pages/MonitorPages/CurrentStudentList';
const examSessionId = localStorage.getItem('examSessionId');

const MonitorApp = () => {
  const { socket, loadDevice } = useContext(ExamSessionContext);
  useEffect(() => {
    socket.emit('newExamSession', { examSessionId }, ({ rtpCapabilities }) => {
      loadDevice(rtpCapabilities);
    });
  }, []);
  const { isDeviceSet } = useSelector((state) => state.session);
  return (
    <>
      <TitleNav />
      {isDeviceSet && (
        <Routes>
          {/* <Route path="/" element={<CurrentStudentList />} /> */}
          <Route path="/" element={<MonitorPage />} />
        </Routes>
      )}
    </>
  );
};

export default MonitorApp;
