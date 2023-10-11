import React, { useEffect, useContext } from 'react';
import { startRecording } from '../../utils/mediasoup/examSession/recordScreen';
import ExamSessionControl from '../../components/examSession/ExamSessionControl';
import ExamSessionView from '../../components/examSession/ExamSessionView';
import RealtimeContext from '../../context/realtimeContext';
const ExamSession = () => {
  const { socket } = useContext(RealtimeContext);
  useEffect(() => {
    startRecording(socket);
  }, []);

  return (
    <div className="relative pt-10 h-screen overflow-hidden">
      <ExamSessionControl />
      <ExamSessionView />
    </div>
  );
};

export default ExamSession;
