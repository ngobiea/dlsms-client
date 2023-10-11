import React from 'react';
import TitleNav from './components/TitleNav';
import { socket } from './context/realtimeContext';
const examSessionId = localStorage.getItem('examSessionId');
console.log(examSessionId);
window.account.blurExamQuestionWindow(() => {
  console.log('examQuestionWindow blur');
  if (socket) {
    socket.emit('blurEQWindow', { examSessionId });
  }
});
window.account.minimizeExamQuestionWindow(() => {
  console.log('examQuestionWindow minimize');
  if (socket) {
    socket.emit('minEQWindow', { examSessionId });
  }
});

window.account.maximizeExamQuestionWindow(() => {
  console.log('examQuestionWindow maximize');
  if (socket) {
    socket.emit('maxEQWindow', { examSessionId });
  }
});
window.account.focusExamQuestionWindow(() => {
  console.log('examQuestionWindow focus');
  if (socket) {
    socket.emit('focusEQWindow', { examSessionId });
  }
});

const ExamQuestionApp = () => {
  return (
    <>
      <TitleNav />;
      <div className="flex h-full w-full items-center justify-center">
        ExamQuestionApp
      </div>
    </>
  );
};

export default ExamQuestionApp;
