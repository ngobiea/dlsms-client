import React, { useContext, useEffect } from 'react';

import RealtimeContext from '../../context/realtimeContext';
import { useSelector, useDispatch } from 'react-redux';
import SessionControl from './SessionControl';
import SessionView from './SessionView';
const ClassSession = () => {
  const dispatch = useDispatch();
  const { setUpWebCam } = useContext(RealtimeContext);

  const {
    isMicEnable,
    isVideoEnable,
    isShareScreen,
    isShowChat,
    isShowParticipants,
    isRecording,
    activeBorder,
  } = useSelector((state) => {
    return state.session;
  });


  return (
    <div className="relative pt-10 h-screen overflow-hidden">
      <SessionControl />
      <SessionView />
    </div>
  );
};

export default ClassSession;
