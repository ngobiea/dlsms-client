import React, { useEffect, useContext } from 'react';
import TitleNav from './components/TitleNav';

const { studentId, examSessionId } = JSON.parse(
  localStorage.getItem('tutorSession')
);

console.log(studentId, examSessionId);
import { socket } from './context/realtimeContext';
const TutorSessionApp = () => {
  const { examSession } = useContext(ExamSessionContext);
  useEffect(() => {
    socket.emit(
      'newExamSession',
      { examSessionId },
      async ({ rtpCapabilities }) => {
        console.log(rtpCapabilities);
        examSession.loadTutorDevice(rtpCapabilities, socket, studentId);
      }
    );
  }, []);
  return (
    <>
      <TitleNav />;
      <div className="flex h-full w-full items-center justify-center">
        ExamQuestionApp
      </div>
    </>
  );
};

export default TutorSessionApp;
