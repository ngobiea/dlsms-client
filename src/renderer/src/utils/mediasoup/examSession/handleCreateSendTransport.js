const examSessionId = localStorage.getItem('examSessionId');
console.log(examSessionId);
export const handleCreateProducerTransport = (
  socket,
  device,
  mediasoupClient
) => {
  socket.emit(
    'createExamSessionWebRTCTransport',
    { examSessionId, isProducer: true },
    ({ serverParams }) => {
      if (serverParams.error) {
        console.log(serverParams.error);
        return;
      }
      console.log(serverParams);

      mediasoupClient.producerTransport =
        device.createSendTransport(serverParams);

      console.log('new producer transport');

      console.log(mediasoupClient.producerTransport);

      mediasoupClient.producerTransport.on(
        'connect',
        async ({ dtlsParameters }, callback, errback) => {
          try {
            await socket.emit('examSessionOnProducerTransportConnect', {
              dtlsParameters,
              examSessionId,
            });
            console.log('transport connected success');
            callback();
          } catch (error) {
            errback(error);
          }
        }
      );

      mediasoupClient.producerTransport.on(
        'produce',
        async (parameters, callback, errback) => {
          console.log(parameters);
          try {
            await socket.emit(
              'examSessionOnTransportProduce',
              {
                examSessionId,
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
            console.log('transport produce success, server-side producer ID:');
          } catch (error) {
            errback(error);
          }
        }
      );
    }
  );
};
