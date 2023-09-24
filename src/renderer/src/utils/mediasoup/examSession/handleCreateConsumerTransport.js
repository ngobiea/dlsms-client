import { params } from '../params';

const examSessionId = localStorage.getItem('examSessionId');

export const handleCreateConsumerTransport = async (
  remoteProducerId,
  socket,
  device,
  mediasoupClient,
  connectRecvTransport
) => {
  await socket.emit(
    'createExamSessionWebRTCTransport',
    { examSessionId, isProducer: false },
    ({ serverParams }) => {
      if (serverParams.error) {
        console.log(serverParams.error);
        return;
      }
      let consumerTransport;
      try {
        consumerTransport =
          device.createRecvTransport(serverParams);
        console.log('new consumer transport');
        console.log(consumerTransport);
      } catch (error) {
        console.log(error);
        return;
      }
      consumerTransport.on(
        'connect',
        async ({ dtlsParameters }, callback, errback) => {
          try {
            await socket.emit('examSessionOnConsumerTransportConnect', {
              examSessionId,
              dtlsParameters,
              consumerTransportId: serverParams.id,
            });
            console.log('transport connected success');
            callback();
          } catch (error) {
            errback(error);
          }
        }
      );
      // connectRecvTransport(
      //   consumerTransport,
      //   remoteProducerId,
      //   serverParams.id
      // );
    }
  );
};
