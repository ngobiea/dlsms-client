import React, { useContext, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector } from 'react-redux';
import TitleNav from './components/TitleNav';
import { setScreenId, store } from './store';
import { ipcRenderer } from 'electron';
import { recordScreen } from './utils/mediasoup/examSession/recordScreen';
import ExamSessionSetup from './pages/ExamSessionPages/ExamSessionSetup';
import ExamSessionContext from './context/ExamSessionContext';
import ExamSession from './pages/ExamSessionPages/ExamSession';
import Notification from './components/Notification';
import CloseWindow from './pages/ExamSessionPages/CloseWindow';
const examSessionId = localStorage.getItem('examSessionId');
ipcRenderer.on('source', (_e, { source }) => {
  console.log('source', source);
  store.dispatch(setScreenId(source.id));
  recordScreen(source.id);
});
const ExamSessionApp = () => {
  const { socket, examSession } = useContext(ExamSessionContext);
  const { notification } = useSelector((state) => state.app);
  const [message, setMessage] = useState('');

  useEffect(() => {
    socket.emit(
      'newExamSession',
      { examSessionId },
      async ({ rtpCapabilities, status }) => {
        if (status === 'studentEnded') {
          setMessage('You exam session has ended, Close Window');
          console.log('Student ended exam session, Close Exam session window');
        } else if (status === 'ongoing') {
          await examSession.loadDevice(rtpCapabilities, socket);
          setMessage('');
        } else if (status === 'ended') {
          setMessage('Exam session ended, Close Window');
          console.log('Exam session ended, Close Exam session window');
        }
      }
    );
    ipcRenderer.send('showScreenSources');
  }, []);
  const { isDeviceSet } = useSelector((state) => state.session);
  return (
    <>
      <TitleNav />
      {message !== '' && <CloseWindow message={message} />}
      {notification.isActive && <Notification />}
      {isDeviceSet && (
        <Routes>
          <Route path="/" element={<ExamSessionSetup />} />
          <Route path=":examSessionId" element={<ExamSession />} />
          {/* <Route path="closeWindow" element={<CloseWindow />} /> */}
        </Routes>
      )}
    </>
  );
};

export default ExamSessionApp;
