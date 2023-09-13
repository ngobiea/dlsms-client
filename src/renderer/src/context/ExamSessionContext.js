import React, { createContext, useContext } from 'react';
import { Device } from 'mediasoup-client';
import { useSelector } from 'react-redux';
import { handleLoadDevice } from '../utils/mediasoup/loadDevice';
import { handleCreateProducerTransport } from '../utils/mediasoup/examSession/handleCreateSendTransport';
import { handleCreateConsumerTransport } from '../utils/mediasoup/examSession/handleCreateConsumerTransport';
import RealtimeContext from './realtimeContext';

const device = new Device();
const examSessionId = localStorage.getItem('examSessionId');

const mediasoupClient = {
  producerTransport: null,
  consumerTransport: null,
  consumingTransports: [],
  videoProducer: null,
  audioProducer: null,
  screenShareProducer: null,
};
const consumerTransports = [];
let consumer;

const ExamSessionContext = createContext();

const ExamSessionProvider = ({ children }) => {
  const { socket } = useContext(RealtimeContext);
  const { accountType } = useSelector((state) => state.account);
  console.log(accountType);
  const loadDevice = async (rtpCapabilities) => {
    await handleLoadDevice(device, rtpCapabilities);

    createSendTransport();
    createReceiveTransport();
  };

  const createSendTransport = () => {
    handleCreateProducerTransport(socket, device, mediasoupClient);
  };
  const createReceiveTransport = () => {
   handleCreateConsumerTransport(socket, device, mediasoupClient);
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
