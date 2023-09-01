import React, { createContext, useContext } from 'react';
import { Device } from 'mediasoup-client';
import { handleLoadDevice } from '../utils/mediasoup/loadDevice';
const device = new Device();

import RealtimeContext from './realtimeContext';

const ExamSessionContext = createContext();

const ExamSessionProvider = ({ children }) => {
  const { socket } = useContext(RealtimeContext);

  const loadDevice = async (rtpCapabilities) => {
    await handleLoadDevice(device, rtpCapabilities);
  };

  const values = {
    socket,
    loadDevice,
  };
  return (
    <ExamSessionContext.Provider value={values}>
      {children}
    </ExamSessionContext.Provider>
  );
};

export { ExamSessionProvider };
export default ExamSessionContext;
