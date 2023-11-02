import { User } from './User';
import { Device } from 'mediasoup-client';

export class Tutor {
  constructor(examSessionId, studentId) {
    this.examSessionId = examSessionId;
    this.studentId = studentId;
    this.ProducerTransport = null;
    this.consumerTransport = null;
    this.audioProducer = null;
    this.videoProducer = null;
    this.screenProducer = null;
    this.socket = null;
    this.device = new Device();
    this.student = null;
  }
  async loadDevice(rtpCapabilities, socket) {
    this.setSocket(socket);
    try {
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device RTP Capabilities', this.device.rtpCapabilities);
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
  }
  async createProducerTransport() {
    try {
      this.socket.emit(
        'createOneToOnePT',
        { examSessionId: this.examSessionId, userId: this.studentId },
        ({ serverParams }) => {
          if (serverParams.error) {
            console.log(serverParams.error);
            return;
          }
          console.log(serverParams);
          this.producerTransport = this.device.createSendTransport({
            id: serverParams.id,
            iceParameters: serverParams.iceParameters,
            iceCandidates: serverParams.iceCandidates,
            dtlsParameters: serverParams.dtlsParameters,
          });
          this.student = new User(
            this.examSessionId,
            this.device,
            serverParams.user,
            this.socket,
            serverParams.producerIds
          );
          console.log('new tutor producer transport');
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
}
