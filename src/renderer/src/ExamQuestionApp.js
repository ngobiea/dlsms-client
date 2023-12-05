import React from 'react';
import TitleNav from './components/TitleNav';
import { socket } from './context/realtimeContext';
import ExamSessionPage from './pages/SessionPages/ExamSession/ExamSessionPage';
import NoConnection from './pages/NoConnection';
const examSessionId = localStorage.getItem('examSessionId');
console.log(examSessionId);
window.account.blurExamQuestionWindow(() => {
  console.log('examQuestionWindow blur');
  if (socket) {
    socket.emit('violation', {
      examSessionId,
      violation: {
        type: 'blur',
        title: 'Window Lost Focus',
        description: 'Exam Question Window Loses Focus',
        time: new Date(),
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
        type: 'minimize',
        title: 'Minimize Window',
        description: 'Exam Question Window Minimized',
        time: new Date(),
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
        type: 'maximize',
        title: 'Maximize Window',
        description: 'Exam Question Window Maximized',
        time: new Date(),
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
        type: 'focus',
        title: 'Window Gain Focus',
        description: 'Exam Question Window Gain Focus',
        time: new Date(),
      },
    });
  }
});

const ExamQuestionApp = () => {
  const { notification, downloadProgress, isOnline } = useSelector(
    (state) => state.app
  );
  return (
    <>
      <TitleNav />
      {isOnline ? (
        <div className=" w-full h-full">
          <ExamSessionPage />
        </div>
      ) : (
        <NoConnection />
      )}
    </>
  );
};

export default ExamQuestionApp;
