import { store, addPeers, removePeer } from '../../../store';
import { Device } from 'mediasoup-client';
import { OneUser } from './OneUser';
export class Tutor {
  constructor(examSessionId, studentId) {
    this.examSessionId = examSessionId;
    this.studentId = studentId;
    this.ProducerTransport = null;
    this.audioProducer = null;
    this.videoProducer = null;
    this.screenProducer = null;
    this.socket = null;
    this.device = new Device();
    this.student = null;
  }
  async loadDevice(rtpCapabilities, socket, student) {
    this.setSocket(socket);
    try {
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device RTP Capabilities', this.device.rtpCapabilities);
      this.setStudent(student);
      this.createProducerTransport();
    } catch (error) {
      console.log(error);
      if (error.name === 'UnsupportedError') {
        console.warn('browser not supported');
      }
    }
  }
  setSocket(socket) {
    this.socket = socket;
    socket.on('oneProducer', this.newProducer.bind(this));
    socket.on('closeOneCT', this.closeConsumerTransport.bind(this));
  }
  setStudent(students) {
    console.log(students);
    if (Object.keys(students).length === 0) {
      console.log('no student');
      return;
    }
    Object.values(students).forEach(({ producerIds, student }) => {
      const std = new OneUser(
        this.examSessionId,
        this.device,
        student,
        this.socket,
        producerIds
      );
      store.dispatch(addPeers(student));
      this.student = std;
    });
  }

  createProducerTransport() {
    try {
      this.socket.emit(
        'createOneToOneTp',
        {
          examSessionId: this.examSessionId,
          isProducer: true,
          userId: this.studentId,
        },
        async ({ serverParams }) => {
          if (serverParams.error) {
            console.log(serverParams.error);
            return;
          }
          this.producerTransport =
            this.device.createSendTransport(serverParams);
          console.log('new tutor producer transport');
          console.log(this.producerTransport);
          this.producerTransport.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await this.socket.emit('connectOneToOnePT', {
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
            async ({ kind, rtpParameters, appData }, callback, errback) => {
              try {
                await this.socket.emit(
                  'onOneToOneProduce',
                  {
                    kind,
                    rtpParameters,
                    appData,
                    examSessionId: this.examSessionId,
                    userId: this.studentId,
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
    console.log('calling produce video');
    try {
      const { isVideoEnable } = store.getState().session;
      console.log(isVideoEnable);
      if (isVideoEnable) {
        this.videoProducer = await this.producerTransport.produce({
          track: store.getState().session.localVideoStream.getVideoTracks()[0],
          appData: {
            video: true,
            audio: false,
            screen: false,
          },
        });
        console.log(this.videoProducer);
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
  newProducer({ examSessionId, producerId }) {
    try {
      if (examSessionId !== this.examSessionId) {
        console.log('not same exam session');
        return;
      }
      this.student.createConsumer(producerId);
    } catch (error) {}
  }
  closeProducer(producerType) {
    let producerId;
    try {
      if (producerType === 'video') {
        producerId = this.videoProducer.id;
      } else if (producerType === 'screen') {
        producerId = this.screenProducer.id;
      }
      this.socket.emit(
        'closeESP',
        {
          examSessionId: this.examSessionId,
          producerId,
        },
        () => {
          if (producerType === 'video') {
            this.videoProducer.close();
            this.videoProducer = null;
            console.log('Video producer closed');
          } else if (producerType === 'screen') {
            this.screenProducer.close();
            this.screenProducer = null;
            console.log('Screen producer closed');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  pauseAudioProducer() {
    try {
      this.socket.emit(
        'pauseESP',
        {
          examSessionId: this.examSessionId,
          producerId: this.audioProducer.id,
        },
        () => {
          this.audioProducer.pause();
          console.log('Audio producer paused');
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  resumeAudioProducer() {
    try {
      this.socket.emit(
        'resumeESP',
        {
          examSessionId: this.examSessionId,
          producerId: this.audioProducer.id,
        },
        () => {
          this.audioProducer.resume();
          console.log('Audio producer resumed');
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  closeConsumerTransport({ examSessionId, userId }) {
    try {
      if (this.examSessionId !== examSessionId) {
        console.log('Not this class session consumer transport');
        return;
      }
      store.dispatch(removePeer(userId));
      this.student.closeConsumerTransport();
      this.student = null;
    } catch (error) {
      console.log(error);
    }
  }
}
