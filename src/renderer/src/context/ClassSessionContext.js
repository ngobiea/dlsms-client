import React, { createContext, useContext } from 'react';
import { Device } from 'mediasoup-client';
import { useDispatch, useSelector } from 'react-redux';
const device = new Device();

import RealtimeContext from './realtimeContext';
import { handleLoadDevice } from '../utils/mediasoup/loadDevice';
import { handleCreateSendTransport } from '../utils/mediasoup/classSession/handleCreateSendTransport';
import { addRemoteStream } from '../store';
const ClassSessionContext = createContext();
const mediasoupClient = {
  producerTransport: null,
  consumingTransports: [],
};

let consumerTransports = []; // consumer multiple streams
let audioProducer;
let videoProducer;
let consumer;

const ClassSessionProvider = ({ children }) => {
  const dispatch = useDispatch();
  const { socket } = useContext(RealtimeContext);
  const loadDevice = async (rtpCapabilities) => {
    await handleLoadDevice(device, rtpCapabilities);
    createSendTransport();
  };
  const { videoParams, audioParams } = useSelector((state) => {
    return state.session;
  });

  const createSendTransport = () => {
    handleCreateSendTransport(socket, device, mediasoupClient, getProducers);
  };
  const getProducers = () => {
    socket.emit('getProducers', (producerIds) => {
      console.log(producerIds);
      producerIds.forEach(signalNewConsumerTransport);
    });
  };
  const signalNewConsumerTransport = async (remoteProducerId) => {
    if (mediasoupClient.consumingTransports.includes(remoteProducerId)) {
      return;
    }
    mediasoupClient.consumingTransports.push(remoteProducerId);

    await socket.emit(
      'createWebRtcTransport',
      { consumer: true },
      ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }
        console.log('PARAMS...', serverParams);

        let consumerTransport;
        try {
          consumerTransport = device.createRecvTransport(serverParams);
        } catch (error) {
          console.log(error);
          return;
        }
        consumerTransport.on(
          'connect',
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.emit('transport-recv-connect', {
                dtlsParameters,
                serverConsumerTransportId: serverParams.id,
              });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
        connectRecvTransport(
          consumerTransport,
          remoteProducerId,
          serverParams.id
        );
      }
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
        console.log(`Consumer Params ${serverParams}`);

        consumer = await consumerTransport.consume({
          id: serverParams.id,
          producerId: serverParams.producerId,
          kind: serverParams.kind,
          rtpParameters: serverParams.rtpParameters,
        });

        consumerTransports = [
          ...consumerTransports,
          {
            consumerTransport,
            consumer,
            serverConsumerTransportId: serverParams.id,
            producerId: remoteProducerId,
          },
        ];

        const { track } = consumer;
        const remoteStream = new MediaStream([track]);
        dispatch(addRemoteStream({ remoteProducerId, remoteStream }));

        socket.emit('consumer-resume', {
          serverConsumerId: serverParams.serverConsumerId,
        });
      }
    );
  };

  const connectSendTransport = async () => {
    try {
      audioProducer = await mediasoupClient.producerTransport.produce(
        audioParams
      );
      videoProducer = await mediasoupClient.producerTransport.produce(
        videoParams
      );

      console.log('video producer created');
      console.log(videoProducer);
      audioProducer.on('trackended', () => {
        console.log('audio track ended');

        // close audio track
      });

      audioProducer.on('transportclose', () => {
        console.log('audio transport ended');

        // close audio track
      });

      videoProducer.on('trackended', () => {
        console.log('video track ended');

        // close video track
      });

      videoProducer.on('transportclose', () => {
        console.log('video transport ended');
        // close video track
      });
    } catch (error) {
      console.log('Error occur when producing transport');
      console.log(error);
    }
  };

  const values = { socket, loadDevice, connectSendTransport };

  return (
    <ClassSessionContext.Provider value={values}>
      {children}
    </ClassSessionContext.Provider>
  );
};

export { ClassSessionProvider };
export default ClassSessionContext;
