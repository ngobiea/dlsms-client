import { setIsDeviceSet, store, addStudentStreams } from '../../../store';
import { Device } from 'mediasoup-client';
import { socket } from '../../../context/realtimeContext';
import { User } from './User';
export class ExamSession {
  constructor(examSessionId, accountType) {
    this.socket = null;
    this.device = new Device();
    this.accountType = accountType;
    this.examSessionId = examSessionId;
    this.audioProducer = null;
    this.videoProducer = null;
    this.screenProducer = null;
    this.producerTransport = null;
    this.studentConsumerTransports = new Map();
    this.currentStudents = new Map();
    this.tutorConsumerTransport = null;
    this.consumers = new Map();
    this.studentProducerTransportIds = new Map();
    this.studentProducerIds = [];
  }
  async loadDevice(rtpCapabilities, ws) {
    try {
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device RTP Capabilities', this.device.rtpCapabilities);
      this.socket = ws;
      store.dispatch(setIsDeviceSet(true));
      this.setUpUser();
    } catch (error) {
      console.log(error);
      if (error.name === 'UnsupportedError') {
        console.warn('browser not supported');
      }
    }
  }
  setUpUser() {
    console.log(this.accountType);
    try {
      if (this.accountType === 'student') {
        this.createProducerTransport();
      } else if (this.accountType === 'tutor') {
        this.getStudentIds();
      }
    } catch (error) {}
  }
  getStudentIds() {
    this.socket.emit(
      'getStudentPTIds',
      { examSessionId: this.examSessionId },
      ({ producerTransportIds }) => {
        console.log(producerTransportIds);
        if (Object.keys(producerTransportIds).length === 0) {
          console.log('no student in this exam session');
          return;
        }

        for (const [transportId, producerIds] of Object.entries(
          producerTransportIds
        )) {
          this.signalConsumerTransport(transportId, producerIds);
        }
      }
    );
  }
  async createProducerTransport() {
    try {
      this.socket.emit(
        'createExamSessionTp',
        { examSessionId: this.examSessionId, isProducer: true },
        ({ serverParams }) => {
          if (serverParams.error) {
            console.log(serverParams.error);
            return;
          }
          console.log(serverParams);
          this.producerTransport =
            this.device.createSendTransport(serverParams);
          console.log('new producer transport');
          console.log(this.producerTransport);
          this.producerTransport.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await this.socket.emit('ESOnPTConnect', {
                  dtlsParameters,
                  examSessionId: this.examSessionId,
                });
                console.log('transport connected success');
                callback();
              } catch (error) {
                errback(error);
              }
            }
          );
          this.producerTransport.on(
            'produce',
            async (parameters, callback, errback) => {
              console.log(parameters);
              try {
                await this.socket.emit(
                  'ESOnPTProduce',
                  {
                    examSessionId: this.examSessionId,
                    kind: parameters.kind,
                    rtpParameters: parameters.rtpParameters,
                    appData: parameters.appData,
                  },
                  ({ id }) => {
                    // Tell the transport that parameters were transmitted and provide it with the
                    // server side producer's id.
                    callback({ id });
                  }
                );
              } catch (error) {
                errback(error);
              }
            }
          );
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  async signalConsumerTransport(transportId, producerIds) {
    // if (this.studentProducerTransportIds.has(transportId)) {
    //   return;
    // }
    // this.studentProducerTransportIds.set(transportId, producerIds);
    if (producerIds.length !== 0) {
      this.createConsumerTransport(transportId, producerIds);
    }
  }

  async produceAudio(stream) {
    const { micState } = store.getState().session;
    try {
      if (micState === 'enable') {
        this.audioProducer = await this.producerTransport.produce({
          track: stream.getAudioTracks()[0],
          appData: {
            audio: true,
            screen: false,
            video: false,
          },
        });
        this.audioProducer.on('trackended', () => {
          console.log('audio track ended');
          // close audio track
        });
        this.audioProducer.on('transportclose', () => {
          console.log('audio transport closed');
          // close audio track
        });
        console.log('Audio producer created:', this.audioProducer.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async produceVideo() {
    try {
      const { isVideoEnable } = store.getState().session;
      if (isVideoEnable) {
        this.videoProducer = await this.producerTransport.produce({
          track: store.getState().session.localVideoStream.getVideoTracks()[0],
          appData: {
            video: true,
            audio: false,
            screen: false,
          },
        });
        this.videoProducer.on('trackended', () => {
          console.log('video track ended');
          // close video track
        });
        this.videoProducer.on('transportclose', () => {
          console.log('video transport closed');
          // close video track
        });
        console.log('Video producer created:', this.videoProducer.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async produceScreen() {
    try {
      const { isScreenEnable } = store.getState().session;
      if (isScreenEnable) {
        this.screenProducer = await this.producerTransport.produce({
          track: store.getState().session.localScreenStream.getVideoTracks()[0],
          appData: {
            screen: true,
            audio: false,
            video: false,
          },
        });
        this.screenProducer.on('trackended', () => {
          console.log('screen track ended');
          // close screen track
        });
        this.screenProducer.on('transportclose', () => {
          console.log('screen transport closed');
          // close screen track
        });
        console.log('Screen producer created:', this.screenProducer.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  async createConsumerTransport(transportId, producerIds) {
    await socket.emit(
      'createExamSessionTp',
      { examSessionId: this.examSessionId, isProducer: false },
      async ({ serverParams }) => {
        console.log(serverParams);
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }

        this.studentConsumerTransports.set(
          serverParams.id,
          this.device.createRecvTransport(serverParams)
        );
        console.log('new consumer transport');
        console.log(this.studentConsumerTransports.get(serverParams.id));
        this.studentConsumerTransports
          .get(serverParams.id)
          .on('connect', async ({ dtlsParameters }, callback, errback) => {
            try {
              await socket.emit('ESOnCTConnect', {
                examSessionId: this.examSessionId,
                dtlsParameters,
                consumerTransportId: serverParams.id,
              });
              console.log('transport connected success');
              callback();
            } catch (error) {
              errback(error);
            }
          });
        if (!this.currentStudents.has(transportId)) {
          this.currentStudents.set(transportId, new User());
        }
        for (const producerId of producerIds) {
          await this.connectRecvTransport(
            producerId,
            serverParams.id,
            transportId
          );
        }
        store.dispatch(
          addStudentStreams(this.currentStudents.get(transportId).getUserData())
        );
      }
    );
  }
  async connectRecvTransport(producerId, consumerTransportId, transportId) {
    await this.socket.emit(
      'ESOnCTConsume',
      {
        examSessionId: this.examSessionId,
        rtpCapabilities: this.device.rtpCapabilities,
        producerId,
        consumerTransportId,
      },
      async ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }
        const { id, kind, rtpParameters, producerAppData, userData } =
          serverParams;
        const consumer = await this.studentConsumerTransports
          .get(consumerTransportId)
          .consume({
            id,
            producerId,
            kind,
            rtpParameters,
            appData: producerAppData,
          });
        this.consumers.set(consumer.id, consumer);

        const { track } = this.consumers.get(consumer.id);
        this.currentStudents
          .get(transportId)
          .addConsumer(consumer.id, track, producerAppData);
        this.currentStudents.get(transportId).setUserData(userData);
        this.consumers.get(consumer.id).on('transportclose', () => {
          console.log('transport closed so consumer closed');
        });
        this.consumers.get(consumer.id).on('trackended', () => {});

        console.log(track);
        this.socket.emit('ESOnCTResume', {
          examSessionId: this.examSessionId,
          consumerId: id,
        });
      }
    );
  }
}
