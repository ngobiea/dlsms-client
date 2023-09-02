export const handleCreateSendTransport = (
  socket,
  device,
  mediasoupClient,
  getProducers
) => {
  socket.emit(
    'createWebRtcTransport',
    { consumer: false },
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
            await socket.emit('transport-connect', {
              dtlsParameters,
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
              'transport-produce',
              {
                kind: parameters.kind,
                rtpParameters: parameters.rtpParameters,
                appData: parameters.appData,
              },
              ({ id, producersExist }) => {
                // Tell the transport that parameters were transmitted and provide it with the
                // server side producer's id.
                callback({ id });

                if (producersExist) {
                  getProducers();
                }
              }
            );
          } catch (error) {
            errback(error);
          }
        }
      );
    }
  );
};
