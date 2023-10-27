import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import TitleNav from './components/TitleNav';
import { setScreenId, store, setStudentImages } from './store';
import { ipcRenderer } from 'electron';
import {
  captureScreen,
  stopRecording,
} from './utils/mediasoup/examSession/recordScreen';
import FaceApi from './utils/face/FaceApi';
import ExamSessionSetup from './pages/ExamSessionPages/ExamSessionSetup';
import ExamSession from './pages/ExamSessionPages/ExamSession';
import Notification from './components/Notification';
import CloseWindow from './pages/ExamSessionPages/CloseWindow';
import { socket } from './context/realtimeContext';
import RulesPage from './pages/ExamSessionPages/RulesPage';
import VerificationPage from './pages/ExamSessionPages/VerificationPage';
const examSessionId = localStorage.getItem('examSessionId');
ipcRenderer.on('source', (_e, { source }) => {
  console.log('source', source);
  store.dispatch(setScreenId(source.id));
  captureScreen(source.id);
});
ipcRenderer.on('bHistory', (_e, { history }) => {
  console.log('bHistory', history);
  socket.emit('bHistory', {
    examSessionId,
    history: {
      type: 'history',
      title: history.title,
      url: history.url,
      time: new Date(),
      browser: history.browser,
    },
  });
});
ipcRenderer.on('stopRecord', (_e) => {
  stopRecording(socket);
  FaceApi.stopRealTimeRecognition();
});
socket.on('ESOpen', async (callback) => {
  try {
    console.log('received ESOpen event');
    const isESOpen = await ipcRenderer.invoke('isExamSessionWindowOpen');
    console.log(isESOpen);
    callback(isESOpen);
  } catch (error) {
    console.log(error);
  }
});
const ExamSessionApp = () => {
  const { notification } = useSelector((state) => state.app);
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();
  useEffect(() => {
    socket.emit('examStatus', { examSessionId }, ({ status }) => {
      if (status === 'studentEnded') {
        setMessage('You exam session has ended, Close Window');
        console.log('Student ended exam session, Close Exam session window');
      } else if (status === 'ongoing') {
        setMessage('');
        socket.emit('studentImages', ({ images }) => {
          dispatch(setStudentImages(images));
          FaceApi.loadRecognitionModels();
        });
      } else if (status === 'ended') {
        setMessage('Exam session ended, Close Window');
        console.log('Exam session ended, Close Exam session window');
      } else if (status === 'invalid') {
        setMessage('Invalid Exam Session, Close Window');
        console.log('Invalid Exam Session, Close Exam session window');
      } else if (status === 'pending') {
        setMessage('Exam Session is not started yet, Close Window');
        console.log(
          'Exam Session is not started yet, Close Exam session window'
        );
      }
    });
  }, []);

  return (
    <>
      <TitleNav />
      {message !== '' && <CloseWindow message={message} />}
      {notification.isActive && <Notification />}
      {message === '' && (
        <Routes>
          <Route path="/" element={<RulesPage />} />
          <Route path="/setup" element={<ExamSessionSetup />} />
          <Route path="examSession" element={<ExamSession />} />
          <Route path="verify" element={<VerificationPage />} />
        </Routes>
      )}
    </>
  );
};

export default ExamSessionApp;
