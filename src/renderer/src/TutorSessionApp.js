import React, { useEffect } from 'react';
import TitleNav from './components/TitleNav';
import { Tutor } from './utils/mediasoup/examSession/Tutor';
const { studentId, examSessionId } = JSON.parse(
  localStorage.getItem('tutorSession')
);
const tutor = new Tutor(examSessionId, studentId);
console.log(studentId, examSessionId);
import { socket } from './context/realtimeContext';
const TutorSessionApp = () => {
  useEffect(() => {
    socket.emit(
      'newExamSession',
      { examSessionId },
      async ({ rtpCapabilities }) => {
        console.log(rtpCapabilities);
        tutor.loadDevice(rtpCapabilities, socket, studentId);
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
