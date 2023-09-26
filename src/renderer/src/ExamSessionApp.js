import React, { useContext, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';

import TitleNav from './components/TitleNav';
import ExamSessionSetup from './pages/ExamSessionPages/ExamSessionSetup';
import ExamSessionContext from './context/ExamSessionContext';
import ExamSession from './pages/ExamSessionPages/ExamSession';

const examSessionId = localStorage.getItem('examSessionId');

const ExamSessionApp = () => {
  const { socket, examSession } = useContext(ExamSessionContext);
  useEffect(() => {
    socket.emit(
      'newExamSession',
      { examSessionId },
      async ({ rtpCapabilities }) => {
        await examSession.loadDevice(rtpCapabilities, socket);
      }
    );
  }, []);
  const { isDeviceSet } = useSelector((state) => state.session);
  return (
    <>
      <TitleNav />
      {isDeviceSet && (
        <Routes>
          <Route path="/" element={<ExamSessionSetup />} />
          <Route path=":examSessionId" element={<ExamSession />} />
        </Routes>
      )}
    </>
  );
};

export default ExamSessionApp;
