import { ExamSession } from '../utils/mediasoup/examSession/ExamSession';

const examSessionId = localStorage.getItem('examSessionId');
const accountType = JSON.parse(localStorage.getItem('accountType'));
import { socket } from './realtimeContext';
const examSession = new ExamSession(examSessionId, accountType);

const ExamSessionContext = createContext();

const ExamSessionProvider = ({ children }) => {
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

export { ExamSessionProvider, examSession };
export default ExamSessionContext;
