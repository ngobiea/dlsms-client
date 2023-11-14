import { store, addPeerStream } from '../../../store';
export class OneUser {
  constructor(examSessionId, device, user, socket, producerIds) {
    this.examSessionId = examSessionId;
    this.device = device;
    this.user = user;
    this.socket = socket;
    this.producerIds = producerIds;
    this.consumerTransport = null;
    this.consumers = new Map();
    this.setSocket(socket);
    this.createConsumerTransport();
  }
  setSocket(socket) {
    this.socket = socket;
    this.socket.on('closeESConsumer', this.closeConsumer.bind(this));
    this.socket.on('pauseESConsumer', this.pauseConsumer.bind(this));
    this.socket.on('resumeESConsumer', this.resumeConsumer.bind(this));
  }
  createConsumerTransport() {
    this.socket.emit(
      'createOneToOneTp',
      {
        examSessionId: this.examSessionId,
        isProducer: true,
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
              await this.socket.emit('connectOneToOneCT', {
                dtlsParameters,
                examSessionId: this.examSessionId,
                userId: this.user._id.toString(),
              });
              callback();
            } catch (error) {
              errback(error);
            }
          }
        );
        if (this.producerIds) {
          this.producerIds.forEach((producerId) => {
            this.createConsumer(producerId);
          });
        }
      }
    );
  }
  async createConsumer(producerId) {
    await this.socket.emit(
      'oneToOneConsumer',
      {
        examSessionId: this.examSessionId,
        rtpCapabilities: this.device.rtpCapabilities,
        userId: this.user._id.toString(),
        producerId,
      },
      async ({ serverParams }) => {
        const { id, kind, rtpParameters, producerAppData, error } =
          serverParams;

        if (error) {
          console.log(error);
          return;
        }

        const consumer = await this.consumerTransport.consume({
          id,
          producerId,
          kind,
          rtpParameters,
          appData: producerAppData,
        });
        console.log('new consumer:', consumer);
        const peerStream = { id: this.user._id.toString() };
        const { track } = consumer;
        const stream = new MediaStream([track]);
        stream.consumerId = consumer.id;

        if (producerAppData.video) {
          peerStream.video = stream;
        } else if (producerAppData.audio) {
          peerStream.audio = stream;
        } else if (producerAppData.screen) {
          peerStream.screen = stream;
        }
        store.dispatch(addPeerStream(peerStream));

        this.consumers.set(consumer.id, consumer);
        this.consumers.get(consumer.id).on('trackended', () => {
          console.log('track ended');
        });
        this.consumers.get(consumer.id).on('transportclose', () => {
          console.log('transport closed');
          this.consumers.get(consumer.id).close();
          this.consumers.delete(consumer.id);
        });
        this.socket.emit('resumeOneC', {
          examSessionId: this.examSessionId,
          consumerId: id,
        });
      }
    );
  }
  async closeConsumerTransport() {
    if (this.consumerTransport) {
      this.consumerTransport.close();
      this.consumerTransport = null;
    }
  }
  closeConsumer({ examSessionId, consumerId }) {
    console.log('close consumer received');

    const peerStream = { id: this.user._id.toString() };

    if (
      examSessionId === this.examSessionId &&
      this.consumers.has(consumerId)
    ) {
      console.log('closing consumer');
      if (this.consumers.get(consumerId)?.appData.video) {
        peerStream.video = null;
      } else if (this.consumers.get(consumerId)?.appData.audio) {
        peerStream.audio = null;
      } else if (this.consumers.get(consumerId)?.appData.screen) {
        peerStream.screen = null;
      }
      store.dispatch(addPeerStream(peerStream));
      this.consumers.get(consumerId).close();
      this.consumers.delete(consumerId);
    }
  }
  pauseConsumer({ examSessionId, consumerId }) {
    console.log('pause consumer received');
    if (
      examSessionId === this.examSessionId &&
      this.consumers.has(consumerId)
    ) {
      this.consumers.get(consumerId).pause();
      console.log(store.getState().session.peers);
    }
  }
  resumeConsumer({ examSessionId, consumerId }) {
    console.log('resume consumer received');
    if (
      examSessionId === this.examSessionId &&
      this.consumers.has(consumerId)
    ) {
      this.consumers.get(consumerId).resume();
    }
  }
}
