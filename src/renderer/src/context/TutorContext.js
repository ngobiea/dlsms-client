import React, { createContext } from 'react';
import { Tutor } from '../utils/mediasoup/examSession/Tutor';
const { studentId, examSessionId } = JSON.parse(
  localStorage.getItem('tutorSession')
);

import { socket } from './realtimeContext';

const tutor = new Tutor(examSessionId, studentId);

const TutorContext = createContext();

const TutorProvider = ({ children }) => {
  const values = {
    tutor,
    socket,
    examSessionId,
  };

  return (
    <TutorContext.Provider value={values}>{children}</TutorContext.Provider>
  );
};
export { TutorProvider };
export default TutorContext;
