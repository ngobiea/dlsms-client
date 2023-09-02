import React, { createContext, useContext } from 'react';
import { Device } from 'mediasoup-client';
import { useSelector } from 'react-redux';
import { handleLoadDevice } from '../utils/mediasoup/loadDevice';
import { handleCreateSendTransport } from '../utils/mediasoup/examSession/handleCreateSendTransport';
import RealtimeContext from './realtimeContext';

const device = new Device();
const sessionId = localStorage.getItem('sessionId');

const mediasoupClient = {
  producerTransport: null,
  consumingTransports: [],
};
let consumerTransports = [];
let audioProducer;
let videoProducer;
let consumer;

const ExamSessionContext = createContext();

const ExamSessionProvider = ({ children }) => {
  const { socket } = useContext(RealtimeContext);
  const { accountType } = useSelector((state) => state.account);
  console.log(accountType);
  const loadDevice = async (rtpCapabilities) => {
    await handleLoadDevice(device, rtpCapabilities);
    createSendTransport();
  };

  const createSendTransport = () => {
    handleCreateSendTransport(socket, device, mediasoupClient);
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
