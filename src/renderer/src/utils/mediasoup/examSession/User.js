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
    this.socket.on('closeSESConsumer', ({ examSessionId, consumerId }) => {

      console.log('close consumer received');
      
      console.log(examSessionId);
      console.log(consumerId);

      if (examSessionId === this.examSessionId) { 
        this.consumers.get(consumerId).close();
      }
    });
  }

  async createConsumerTransport() {
    await this.socket.emit(
      'createExamSessionTp',
      { examSessionId: this.examSessionId, isProducer: false },
      async ({ serverParams }) => {
        console.log(serverParams);
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
                consumerTransportId: serverParams.id,
                dtlsParameters,
              });
              console.log('transport connected success');
              callback();
            } catch (error) {
              errback(error);
              console.log('transport connected failed');
            }
          }
        );
        for (const producerId of this.producerIds) {
          await this.createConsumer(producerId);
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
        consumerTransportId: this.consumerTransport.id,
        producerId,
      },
      async ({ serverParams }) => {
        console.log(serverParams);
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

  // addConsumerStream(consumerId, stream, appData, userData) {
  //   let type;
  //   if (appData.video) {
  //     type = 'video';
  //   } else if (appData.audio) {
  //     type = 'audio';
  //   } else if (appData.screen) {
  //     type = 'screen';
  //   }
  //   const consumerStream = { stream, type };
  //   console.log(consumerStream);
  //   this.consumerStreams.set(consumerId, consumerStream);
  // }
  // removeConsumerStream(consumerId) {
  //   delete this.consumerStreams[consumerId];
  // }
  // getConsumerStream(consumerId) {
  //   return this.consumerStreams[consumerId];
  // }
  // getConsumerStreams() {
  //   return this.consumerStreams;
  // }
  // setUserData(userData) {
  //   this.userData = userData;
  // }
  // getUserData() {
  //   let streams = {};
  //   let data = {};
  //   this.consumerStreams.forEach((consumerStream) => {
  //     streams[consumerStream.type] = consumerStream.stream;
  //   });
  //   data = {
  //     user: this.userData,
  //     streams,
  //   };
  //   console.log(data);
  //   return data;
  // }
}
