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

  const { videoParams, audioParams, screenShareParams, micState } = useSelector(
    (state) => state.session
  );

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
  const produceAudio = async (stream) => {
    try {
      if (micState === 'enable') {
        mediasoupClient.audioProducer =
          await mediasoupClient.producerTransport.produce({
            track: stream.getAudioTracks()[0],
          });
        mediasoupClient.audioProducer.on('trackended', () => {
          console.log('audio track ended');
          // close audio track
        });
        mediasoupClient.audioProducer.on('transportclose', () => {
          console.log('audio transport closed');
          // close audio track
        });
        console.log(
          'Audio producer created:',
          mediasoupClient.audioProducer.id
        );
      }
    } catch (error) {
      console.log(error);
    }
  };
  const produceVideo = async (isVideoEnable) => {
    try {
      if (isVideoEnable) {
        mediasoupClient.videoProducer =
          await mediasoupClient.producerTransport.produce(videoParams);
        console.log(mediasoupClient.producerTransport.appData);
        mediasoupClient.videoProducer.on('trackended', () => {
          console.log('video track ended');
          // close video track
        });
        mediasoupClient.videoProducer.on('transportclose', () => {
          console.log('video transport closed');
          // close video track
        });
        console.log(
          'Video producer created:',
          mediasoupClient.videoProducer.id
        );
      }

      console.log('producer now producing audio and video...');
    } catch (error) {
      console.log(error);
    }
  };
  const produceScreen = async (isScreenEnable) => {
    try {
      if (isScreenEnable) {
        mediasoupClient.screenShareProducer =
          await mediasoupClient.producerTransport.produce(screenShareParams);

        mediasoupClient.screenShareProducer.on('trackended', () => {
          console.log('screen share track ended');
          // close screen share track
        });
        mediasoupClient.screenShareProducer.on('transportclose', () => {
          console.log('screen share transport closed');
          // close screen share track
        });
        console.log(
          'Screen share producer created:',
          mediasoupClient.screenShareProducer.id
        );
      }

      console.log('producer now producing screen share...');
    } catch (error) {
      console.log(error);
    }
  };
  const values = {
    socket,
    loadDevice,
    produceVideo,
    mediasoupClient,
    examSessionId,
    produceScreen,
    produceAudio,
  };

  return (
    <ExamSessionContext.Provider value={values}>
      {children}
    </ExamSessionContext.Provider>
  );
};

export { ExamSessionProvider };
export default ExamSessionContext;
