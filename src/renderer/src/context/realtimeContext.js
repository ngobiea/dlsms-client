import React, {
  createContext,
  useEffect,
  useState,
  useRef,
  useReducer,
} from 'react';

import io from 'socket.io-client';
import { Device } from 'mediasoup-client';

import { logoutHandler } from '../utils/util';
import { useNavigate } from 'react-router-dom';
import {
  useFetchClassroomsQuery,
  setClassrooms,
  setStudents,
  store,
  setMessages,
} from '../store';
import { useDispatch } from 'react-redux';
import { joinClassroomHandler } from '../realTimeCommunication/classroom/joinClassroomHandler';
import { classroomScheduleMessageHandle } from '../realTimeCommunication/classroom/classroom/classroomScheduleMessageHandle';
import { params } from '../utils/mediasoup/params';
import {
  mediasoupReducer,
  SET_VIDEO_AND_AUDIO_STREAM,
  ADD_NEW_CONSUMER,
  ADD_CONSUMING_TRANSPORT,
  REMOVE_CONSUMER,
} from '../utils/realTimeContext/reducers';

const userDetails = JSON.parse(localStorage.getItem('user'));

let producerTransport;
let audioProducer;
let videoProducer;
let socket;
if (userDetails) {
  socket = io('http://localhost:6001', {
    auth: {
      token: userDetails.token,
    },
  });
}

const RealtimeContext = createContext();

const RealtimeProvider = ({ children }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const videoRef = useRef();

  const { accountType } = store.getState().account;
  const { data, isSuccess } = useFetchClassroomsQuery(accountType);
  const [localStream, setLocalStream] = useState(null);

  const [state, dispatchReducer] = useReducer(mediasoupReducer, {
    device: new Device(),
    producerTransport: null,
    consumerTransports: [],
    audioProducer: null,
    videoProducer: null,
    audioParams: { params },
    videoParams: { params },
    consumingTransports: [],
  });

  const connectWithSocketServer = () => {
    socket.on('connect', () => {
      console.log('successfully connected with socket.io server');
      console.log(socket.id);
    });
    socket.on('online-users', (value) => {
      console.log(value);
    });
    socket.on('connect_error', (err) => {
      console.log(err instanceof Error);
      console.log(err.message);
      console.log(err.data);
    });
    socket.on('update-classroom-members', (value) => {
      joinClassroomHandler(value, navigate);
    });
    socket.on('send-classroom', (value) => {
      store.dispatch(setStudents(value.students));
      store.dispatch(setMessages(value.messages));
    });
    socket.on('classroom-schedule-message', (value) => {
      console.log('received classroom schedule message event');
      classroomScheduleMessageHandle(value, navigate);
    });
  };

  useEffect(() => {
    if (!userDetails) {
      logoutHandler();
    }
    if (isSuccess) {
      dispatch(setClassrooms(data.classrooms));
    }
    connectWithSocketServer();
  }, [data, isSuccess]);

  const setUpWebCam = (video, audio) => {
    if (video || audio) {
      navigator.mediaDevices
        .getUserMedia({
          audio,
          video: video
            ? {
                width: {
                  min: 560,
                  max: 1920,
                },
                height: {
                  min: 400,
                  max: 1080,
                },
              }
            : video,
        })
        .then((mediaStream) => {
          videoRef.current.srcObject = mediaStream;
          setLocalStream(mediaStream);
          dispatchReducer({
            type: SET_VIDEO_AND_AUDIO_STREAM,
            payload: mediaStream,
          });

          return mediaStream;
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const createDevice = async (rtpCapabilities) => {
    try {
      await state.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device RTP Capabilities', state.device.rtpCapabilities);
    } catch (error) {
      console.log(error);
      if (error.name === 'UnsupportedError') {
        console.warn('browser not supported');
      }
    }
  };
  const createSendTransport = () => {
    socket.emit(
      'createWebRtcTransport',
      { consumer: false },
      ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }
        console.log(serverParams);
        producerTransport = state.device.createSendTransport(serverParams);

        producerTransport.on(
          'connect',
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.emit('transport-connect', {
                dtlsParameters,
              });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
        producerTransport.on(
          'produce',
          async (parameters, callback, errback) => {
            console.log(parameters);

            try {
              await socket.emit(
                'transport-produce',
                {
                  kind: parameters.kind,
                  rtpParameters: parameters.rtpParameters,
                  appData: parameters.appData,
                },
                ({ id, producersExist }) => {
                  // Tell the transport that parameters were transmitted and provide it with the
                  // server side producer's id.
                  callback({ id });

                  // if producers exist, then join room
                  if (producersExist) {
                    getProducers();
                  }
                }
              );
            } catch (error) {
              errback(error);
            }
          }
        );
      }
    );
  };

  const connectSendTransport = async () => {
    audioProducer = await producerTransport.produce(state.audioParams);
    videoProducer = await producerTransport.product(state.videoParams);

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
  };

  const signalNewConsumerTransport = async (remoteProducerId) => {
    if (state.consumingTransports.includes(remoteProducerId)) {
      return;
    }
    dispatchReducer({
      type: ADD_CONSUMING_TRANSPORT,
      payload: remoteProducerId,
    });

    await socket.emit(
      'createWebRtcTransport',
      { consumer: true },
      ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }
        console.log(`Params...${serverParams}`);
        let consumerTransport;
        try {
          consumerTransport = state.device.createRecvTransport(serverParams);
        } catch (error) {
          console.log(error);
          return;
        }
        consumerTransport.on(
          'connect',
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.emit('transport-connect', {
                dtlsParameters,
              });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
      }
    );
  };

  socket.on('new-producer', ({ producerId }) => {
    signalNewConsumerTransport(producerId);
  });
  const getProducers = async () => {
    socket.emit('getProducers', (producersId) => {
      console.log(producersId);
      producersId.forEach((producerId) => {
        signalNewConsumerTransport(producerId);
      });
    });
  };

  const connectRecvTransport = async (
    consumerTransport,
    remoteProducerId,
    serverConsumerTransportId
  ) => {
    await socket.emit(
      'consume',
      {
        rtpCapabilities: state.device.rtpCapabilities,
        remoteProducerId,
        serverConsumerTransportId,
      },
      async ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }
        console.log(`Consumer Params ${serverParams}`);
        const consumer = await consumerTransport.consume({
          id: serverParams.id,
          producerId: remoteProducerId,
          kind: serverParams.kind,
          rtpParameters: serverParams.rtpParameters,
        });
        dispatchReducer({
          type: ADD_NEW_CONSUMER,
          payload: {
            consumerTransport,
            consumer,
            serverConsumerTransportId: serverParams.id,
            producerId: remoteProducerId,
          },
        });
      }
    );
  };

  socket.on('producer-closed', ({ remoteProducerId }) => {
    console.log('producer closed');
    const producerToClose = state.consumerTransports.find(
      (consumerTransport) => consumerTransport.producer === remoteProducerId
    );
    producerToClose.consumerTransport.close();
    producerToClose.consumer.close();
    dispatchReducer({
      type: REMOVE_CONSUMER,
      payload: remoteProducerId,
    });
  });

  const disableWebcam = () => {
    const { isMicEnable } = store.getState().session;
    const tracks = localStream.getTracks();
    tracks.forEach((track) => {
      track.stop();
    });

    if (isMicEnable) {
      setUpWebCam(false, isMicEnable);
    } else {
      setLocalStream(null);
    }
  };

  const toggleCamera = () => {
    const { isMicEnable } = store.getState().session;
    localStream.getVideoTracks()[0].enabled = isMicEnable;
  };
  const enabledMic = () => {
    localStream.getAudioTracks()[0].enabled = true;
  };
  const disableMic = () => {
    localStream.getAudioTracks()[0].enabled = false;
  };

  const values = {
    socket,
    setUpWebCam,
    localStream,
    videoRef,
    disableWebcam,
    toggleCamera,
    enabledMic,
    disableMic,
    state,
    dispatchReducer,
    createDevice,
  };

  return (
    <RealtimeContext.Provider value={values}>
      {children}
    </RealtimeContext.Provider>
  );
};

export { RealtimeProvider };
export default RealtimeContext;
