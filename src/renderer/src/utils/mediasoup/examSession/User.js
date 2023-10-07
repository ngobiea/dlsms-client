import { store, addStudentStream } from '../../../store';
export class User {
  constructor(examSessionId, device, user, socket, producerIds) {
    this.setSocket(socket);
    this.examSessionId = examSessionId;
    this.device = device;
    this.user = user;
    this.producerIds = producerIds;
    this.consumerTransport = null;
    this.consumers = new Map();

    this.consumerStreams = new Map();

    this.createConsumerTransport();
  }
  setSocket(socket) {
    this.socket = socket;
    this.socket.on('closeESConsumer', this.closeConsumer.bind(this));
  }

  async createConsumerTransport() {
    await this.socket.emit(
      'createExamSessionTp',
      {
        examSessionId: this.examSessionId,
        isProducer: false,
        userId: this.user._id.toString(),
      },
      async ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }
        this.consumerTransport = await this.device.createRecvTransport(
          serverParams
        );
        console.log('new consumer transport');
        console.log(this.consumerTransport);
        this.consumerTransport.on(
          'connect',
          async ({ dtlsParameters }, callback, errback) => {
            try {
              await this.socket.emit('ESOnCTConnect', {
                examSessionId: this.examSessionId,
                userId: this.user._id.toString(),
                dtlsParameters,
              });
              callback();
            } catch (error) {
              errback(error);
              console.log('transport connected failed');
            }
          }
        );
        if (this.producerIds) {
          for (const producerId of this.producerIds) {
            await this.createConsumer(producerId);
          }
        }
      }
    );
  }

  async createConsumer(producerId) {
    await this.socket.emit(
      'ESOnCTConsume',
      {
        examSessionId: this.examSessionId,
        rtpCapabilities: this.device.rtpCapabilities,
        userId: this.user._id.toString(),
        producerId,
      },
      async ({ serverParams }) => {
        if (serverParams.error) {
          console.log(serverParams.error);
          return;
        }

        const { id, kind, rtpParameters, producerAppData } = serverParams;
        const consumer = await this.consumerTransport.consume({
          id,
          producerId,
          kind,
          rtpParameters,
          appData: producerAppData,
        });
        console.log('new consumer:', consumer.id);
        const userStream = { id: this.user._id.toString() };
        const { track } = consumer;
        const stream = new MediaStream([track]);

        if (producerAppData.video) {
          userStream.video = stream;
        } else if (producerAppData.audio) {
          userStream.audio = stream;
        } else if (producerAppData.screen) {
          userStream.screen = stream;
        }

        store.dispatch(addStudentStream(userStream));

        this.consumers.set(consumer.id, consumer);
        this.consumers.get(consumer.id).on('trackended', () => {
          console.log('track ended');
        });
        this.consumers.get(consumer.id).on('transportclose', () => {
          console.log('transport closed');
        });
        this.socket.emit('ESOnCTResume', {
          examSessionId: this.examSessionId,
          consumerId: id,
        });
      }
    );
  }
  closeConsumerTransport() {
    this.consumerTransport.close();
    this.consumerTransport = null;
  }
  closeConsumer({ examSessionId, consumerId }) {
    console.log('close consumer received');

    console.log(examSessionId);
    console.log(consumerId);

    if (examSessionId === this.examSessionId) {
      this.consumers.get(consumerId).close();
      this.consumers.delete(consumerId);
    }
  }
}
