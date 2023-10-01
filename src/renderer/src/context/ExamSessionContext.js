import React, { createContext, useContext } from 'react';
import RealtimeContext from './realtimeContext';
import { ExamSession } from '../utils/mediasoup/examSession/ExamSession';

const examSessionId = localStorage.getItem('examSessionId');
const accountType = JSON.parse(localStorage.getItem('accountType'));

const examSession = new ExamSession(examSessionId, accountType);

const ExamSessionContext = createContext();

const ExamSessionProvider = ({ children }) => {
  const { socket } = useContext(RealtimeContext);

  const values = {
    examSession,
    socket,
    examSessionId,
  };

  return (
    <ExamSessionContext.Provider value={values}>
      {children}
    </ExamSessionContext.Provider>
  );
};

export { ExamSessionProvider };
export default ExamSessionContext;
