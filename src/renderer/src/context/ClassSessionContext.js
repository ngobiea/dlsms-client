import React, { createContext } from 'react';
import { ClassSession } from '../utils/mediasoup/classSession/ClassSession';
const classSessionId = localStorage.getItem('sessionId');
const accountType = JSON.parse(localStorage.getItem('accountType'));
const classSession = new ClassSession(classSessionId, accountType);

const ClassSessionContext = createContext();

const ClassSessionProvider = ({ children }) => {
  const values = { classSession };

  return (
    <ClassSessionContext.Provider value={values}>
      {children}
    </ClassSessionContext.Provider>
  );
};

export { ClassSessionProvider };
export default ClassSessionContext;
