const examSessionId = localStorage.getItem('examSessionId');

export const handleCreateConsumerTransport = (socket, device, mediasoupClient) => {
      socket.emit(
        'createExamSessionWebRTCTransport',
        { examSessionId, isProducer: false },
        ({ serverParams }) => {
          if (serverParams.error) {
            console.log(serverParams.error);
            return;
          }
          try {
            mediasoupClient.consumerTransport =
              device.createRecvTransport(serverParams);
            console.log('new consumer transport');
            console.log(mediasoupClient.consumerTransport);
          } catch (error) {
            console.log(error);
            return;
          }
          mediasoupClient.consumerTransport.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await socket.emit('examSessionOnConsumerTransportConnect', {
                  dtlsParameters,
                  examSessionId,
                  consumerTransportId: serverParams.id,
                });
                console.log('transport connected success');
                callback();
              } catch (error) {
                errback(error);
              }
            }
          );
        }
      );
 };