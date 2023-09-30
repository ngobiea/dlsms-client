import React, { createContext, useContext } from 'react';
import { handleCreateConsumerTransport } from '../utils/mediasoup/examSession/handleCreateConsumerTransport';
import RealtimeContext from './realtimeContext';
import { ExamSession } from '../utils/mediasoup/examSession/ExamSession';

const examSessionId = localStorage.getItem('examSessionId');
const accountType = JSON.parse(localStorage.getItem('accountType'));
const mediasoupClient = {
  producerTransport: null,
  studentProducerTransportIds: new Map(),
  consumerTransports: [],
  consumingTransports: [],
  videoProducer: null,
  audioProducer: null,
  screenShareProducer: null,
};
const examSession = new ExamSession(examSessionId, accountType);

const ExamSessionContext = createContext();

const ExamSessionProvider = ({ children }) => {
  const { socket } = useContext(RealtimeContext);

  const signalConsumerTransport = async (transportId, producerIds) => {
    if (mediasoupClient.studentProducerTransportIds.has(transportId)) {
      return;
    }
    mediasoupClient.studentProducerTransportIds.set(transportId, producerIds);
    await handleCreateConsumerTransport(
      transportId,
      socket,
      device,
      mediasoupClient,
      connectRecvTransport
    );
  };
  const connectRecvTransport = async (
    consumerTransport,
    remoteProducerId,
    serverConsumerTransportId
  ) => {
    await socket.emit(
      'consume',
      {
        rtpCapabilities: device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      },
      async ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }

        const consumer = await consumerTransport.consume({
          id: serverParams.id,
          producerId: serverParams.producerId,
          kind: serverParams.kind,
          rtpParameters: serverParams.rtpParameters,
          appData: { peerId: remoteProducerId },
        });

        mediasoupClient.consumerTransports = [
          ...mediasoupClient.consumerTransports,
          {
            consumerTransport,
            consumer,
            serverConsumerTransportId: serverParams.id,
            producerId: serverParams.producerId,
          },
        ];
      }
    );
  };
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
