import React from 'react';
import TitleNav from './components/TitleNav';
import { socket } from './context/realtimeContext';
const examSessionId = localStorage.getItem('examSessionId');
console.log(examSessionId);
window.account.blurExamQuestionWindow(() => {
  console.log('examQuestionWindow blur');
  if (socket) {
    socket.emit('violation', {
      examSessionId,
      violation: {
        title: 'blur',
        description: 'Exam Question Window Loses Focus',
      },
    });
  }
});
window.account.minimizeExamQuestionWindow(() => {
  console.log('examQuestionWindow minimize');
  if (socket) {
    socket.emit('violation', {
      examSessionId,
      violation: {
        title: 'minimize',
        description: 'Exam Question Window Minimized',
      },
    });
  }
});

window.account.maximizeExamQuestionWindow(() => {
  console.log('examQuestionWindow maximize');
  if (socket) {
    socket.emit('violation', {
      examSessionId,
      violation: {
        title: 'maximize',
        description: 'Exam Question Window Maximized',
      },
    });
  }
});
window.account.focusExamQuestionWindow(() => {
  console.log('examQuestionWindow focus');
  if (socket) {
    socket.emit('violation', {
      examSessionId,
      violation: {
        title: 'focus',
        description: 'Exam Question Window Gain Focus',
      },
    });
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
