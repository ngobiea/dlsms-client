import {
  setIsDeviceSet,
  store,
  addStudentDetails,
  removeStudentFromActiveExamSession,
} from '../../../store';
import { Device } from 'mediasoup-client';
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
    this.activeStudents = new Map();
    this.tutorConsumerTransport = null;
  }
  async loadDevice(rtpCapabilities, ws) {
    this.setSocket(ws);
    try {
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device RTP Capabilities', this.device.rtpCapabilities);
      store.dispatch(setIsDeviceSet(true));
      this.setUpUser();
    } catch (error) {
      console.log(error);
      if (error.name === 'UnsupportedError') {
        console.warn('browser not supported');
      }
    }
  }

  setSocket(socket) {
    this.socket = socket;
    this.socket.on('newESStudent', this.newStudent.bind(this));
    this.socket.on('newESSProducer', this.newProducer.bind(this));
    this.socket.on('closeESCT', this.closeConsumerTransport.bind(this));
  }

  setUpUser() {
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
        if (Object.keys(producerTransportIds).length === 0) {
          console.log('no student in this exam session');
          return;
        }

        for (const [transportId, { producerIds, user }] of Object.entries(
          producerTransportIds
        )) {
          const newUser = new User(
            this.examSessionId,
            this.device,
            user,
            this.socket,
            producerIds
          );
          store.dispatch(addStudentDetails(user));
          this.activeStudents.set(user._id.toString(), newUser);
        }
      }
    );
  }
  newStudent({ examSessionId, user }) {
    console.log('new student received');
    if (examSessionId === this.examSessionId && this.accountType === 'tutor') {
      const newUser = new User(
        this.examSessionId,
        this.device,
        user,
        this.socket,
        null
      );
      store.dispatch(addStudentDetails(user));
      this.activeStudents.set(user._id.toString(), newUser);
    }
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
  newProducer({ examSessionId, userId, producerId }) {
    if (examSessionId === this.examSessionId && this.accountType === 'tutor') {
      this.activeStudents.get(userId).createConsumer(producerId);
    }
  }
  async closeESProducer(producerType) {
    let producerId;
    if (producerType === 'video') {
      producerId = this.videoProducer.id;
    } else if (producerType === 'screen') {
      producerId = this.screenProducer.id;
    }
    this.socket.emit(
      'closeESProducer',
      {
        examSessionId: this.examSessionId,
        producerId,
      },
      () => {
        if (producerType === 'video') {
          this.videoProducer.close();
          this.videoProducer = null;
          console.log('video producer closed');
        } else if (producerType === 'screen') {
          this.screenProducer.close();
          this.screenProducer = null;
          console.log('screen producer closed');
        }
      }
    );
  }

  async pauseAudioProducer() {
    this.socket.emit(
      'pauseESAudioProducer',
      {
        examSessionId: this.examSessionId,
        producerId: this.audioProducer.id,
      },
      () => {
        this.audioProducer.pause();
      }
    );
  }
  async resumerAudioProducer() {
    this.socket.emit(
      'resumeESAudioProducer',
      {
        examSessionId: this.examSessionId,
        producerId: this.audioProducer.id,
      },
      () => {
        this.audioProducer.resume();
      }
    );
  }
  closeConsumerTransport({ examSessionId, userId }) {
    console.log('receive close consumer transport');
    if (examSessionId === this.examSessionId && this.accountType === 'tutor') {
      this.activeStudents.get(userId).closeConsumerTransport();
      this.activeStudents.delete(userId);
      store.dispatch(removeStudentFromActiveExamSession(userId));
    }
  }
}
