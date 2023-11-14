import React, { useEffect } from 'react';
import { startRecording } from '../../utils/mediasoup/examSession/recordScreen';
import TutorSessionControl from '../../components/examSession/TutorSessionControl';
import TutorSessionView from '../../components/examSession/TutorSessionView';
import { socket } from '../../context/realtimeContext';
const TutorSession = () => {
  useEffect(() => {
    startRecording(socket);
  }, []);

  return (
    <div className="relative pt-10 h-screen overflow-hidden">
      <TutorSessionControl />
      <TutorSessionView />
    </div>
  );
};

export default TutorSession;
