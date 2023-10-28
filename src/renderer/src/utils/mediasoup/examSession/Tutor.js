import { User } from './User';
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
  }
  async loadDevice(rtpCapabilities, socket) {
    this.setSocket(socket);
    try {
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device RTP Capabilities', this.device.rtpCapabilities);
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
        'createTESTp',
        {
          examSessionId: this.examSessionId,
          isProducer: true,
          studentId: this.studentId,
        },
        async ({ serverParams }) => {
          if (serverParams.error) {
            console.log(serverParams.error);
            return;
          }
          this.producerTransport = await this.device.createSendTransport({
            id: serverParams.id,
            iceParameters: serverParams.iceParameters,
            iceCandidates: serverParams.iceCandidates,
            dtlsParameters: serverParams.dtlsParameters,
          });
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
}
