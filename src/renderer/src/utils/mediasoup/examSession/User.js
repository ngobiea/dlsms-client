import { store, addStudentStream, addStudentViolation } from '../../../store';
import { v4 as uuidv4 } from 'uuid';

export class User {
  constructor(examSessionId, device, user, socket, producerIds) {
    this.setSocket(socket);
    this.examSessionId = examSessionId;
    this.device = device;
    this.user = user;
    this.producerIds = producerIds;
    this.consumerTransport = null;
    this.consumers = new Map();


    this.createConsumerTransport();
  }
  setSocket(socket) {
    this.socket = socket;
    this.socket.on('closeESConsumer', this.closeConsumer.bind(this));
    this.socket.on('ESviolation', ({ examSessionId, user, violation }) => {
      console.log('received violation for:', user);
      store.dispatch(
        addStudentViolation({
          user,
          ...violation,
          kind: 'violation',
          _id: uuidv4(),
        })
      );
      console.log(violation);
      console.log(examSessionId);
    });
    this.socket.on('BH', ({ examSessionId, user, history }) => {
      console.log('received browser history for:', user);
      store.dispatch(
        addStudentViolation({
          user,
          ...history,
          kind: 'history',
          _id: uuidv4(),
        })
      );
      console.log(history);
      console.log(examSessionId);
    });
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
        const userStream = { id: this.user._id.toString() };
        const { track } = consumer;
        const stream = new MediaStream([track]);
        stream.consumerId = consumer.id;

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
          this.consumers.get(consumer.id).close();
          this.consumers.delete(consumer.id);
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
    const userStream = { id: this.user._id.toString() };

    console.log(examSessionId);
    console.log(consumerId);

    if (
      examSessionId === this.examSessionId &&
      this.consumers.get(consumerId)
    ) {
      console.log('closing consumer', this.consumers.get(consumerId));
      if (this.consumers.get(consumerId)?.appData.video) {
        userStream.video = null;
      } else if (this.consumers.get(consumerId)?.appData.audio) {
        userStream.audio = null;
      } else if (this.consumers.get(consumerId)?.appData.screen) {
        userStream.screen = null;
      }
      store.dispatch(addStudentStream(userStream));
      this.consumers.get(consumerId).close();
    }
  }
}
