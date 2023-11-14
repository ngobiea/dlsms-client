import { store, addPeers, removePeer } from '../../../store';
import { Device } from 'mediasoup-client';
import { Peer } from './Peer';
export class ClassSession {
  constructor(classSessionId, accountType) {
    this.socket = null;
    this.device = new Device();
    this.accountType = accountType;
    this.classSessionId = classSessionId;
    this.audioProducer = null;
    this.videoProducer = null;
    this.screenProducer = null;
    this.producerTransport = null;
    this.peers = new Map();
  }

  async loadDevice(rtpCapabilities, ws, peers) {
    this.setSocket(ws);
    try {
      await this.device.load({ routerRtpCapabilities: rtpCapabilities });
      console.log('Device RTP Capabilities', this.device.rtpCapabilities);
      this.addPeers(peers);
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
    socket.on('newCSPeer', this.newPeer.bind(this));
    socket.on('newCSProducer', this.newProducer.bind(this));
    socket.on('closeCSCT', this.closeConsumerTransport.bind(this));
  }
  addPeers(peers) {
    console.log(peers);
    if (Object.keys(peers).length === 0) {
      console.log('No peers in this class session');
      return;
    }
    Object.values(peers).forEach(({ producerIds, user }) => {
      const peer = new Peer(
        this.classSessionId,
        this.device,
        user,
        this.socket,
        producerIds
      );
      store.dispatch(addPeers(user));
      this.peers.set(user._id.toString(), peer);
    });
  }
  newPeer({ classSessionId, user }) {
    try {
      if (this.classSessionId !== classSessionId) {
        console.log('Not this class session peer');
        return;
      }
      const peer = new Peer(
        this.classSessionId,
        this.device,
        user,
        this.socket
      );
      store.dispatch(addPeers(user));
      this.peers.set(user._id.toString(), peer);
    } catch (error) {
      console.log(error);
    }
  }

  createProducerTransport() {
    try {
      this.socket.emit(
        'createClassSessionTp',
        { classSessionId: this.classSessionId, isProducer: true },
        async ({ serverParams }) => {
          if (serverParams.error) {
            console.log(serverParams?.error);
            return;
          }

          this.producerTransport =
            this.device.createSendTransport(serverParams);
          console.log(this.producerTransport);
          this.producerTransport.on(
            'connect',
            async ({ dtlsParameters }, callback, errback) => {
              try {
                await this.socket.emit('CSOnPTConnect', {
                  dtlsParameters,
                  classSessionId: this.classSessionId,
                });
                callback();
              } catch (error) {
                errback(error);
              }
            }
          );
          this.producerTransport.on(
            'produce',
            async ({ kind, rtpParameters, appData }, callback, errback) => {
              try {
                await this.socket.emit(
                  'CSOnPTProduce',
                  {
                    kind,
                    appData,
                    rtpParameters,
                    classSessionId: this.classSessionId,
                  },
                  ({ id }) => {
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
  async produceAudio(stream) {
    const { micState } = store.getState().session;
    try {
      if (micState === 'enable') {
        this.audioProducer = await this.producerTransport.produce({
          track: stream.getAudioTracks()[0],
          appData: {
            audio: true,
            screen: false,
            video: false,
          },
        });
        this.audioProducer.on('trackended', () => {
          console.log('audio track ended');
          // close audio track
        });
        this.audioProducer.on('transportclose', () => {
          console.log('audio transport closed');
          // close audio track
        });
        console.log('Audio producer created:', this.audioProducer.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async produceVideo() {
    console.log('calling produce video');
    try {
      const { isVideoEnable } = store.getState().session;
      console.log(isVideoEnable);
      if (isVideoEnable) {
        this.videoProducer = await this.producerTransport.produce({
          track: store.getState().session.localVideoStream.getVideoTracks()[0],
          appData: {
            video: true,
            audio: false,
            screen: false,
          },
        });
        console.log(this.videoProducer);
        this.videoProducer.on('trackended', () => {
          console.log('video track ended');
          // close video track
        });
        this.videoProducer.on('transportclose', () => {
          console.log('video transport closed');
          // close video track
        });
        console.log('Video producer created:', this.videoProducer.id);
      }
    } catch (error) {
      console.log(error);
    }
  }
  async produceScreen() {
    try {
      const { isScreenEnable } = store.getState().session;
      if (isScreenEnable) {
        this.screenProducer = await this.producerTransport.produce({
          track: store.getState().session.localScreenStream.getVideoTracks()[0],
          appData: {
            screen: true,
            audio: false,
            video: false,
          },
        });
        this.screenProducer.on('trackended', () => {
          console.log('screen track ended');
          // close screen track
        });
        this.screenProducer.on('transportclose', () => {
          console.log('screen transport closed');
          // close screen track
        });
        console.log('Screen producer created:', this.screenProducer.id);
      }
    } catch (error) {
      console.log(error);
    }
  }

  newProducer({ classSessionId, userId, producerId }) {
    try {
      if (this.classSessionId !== classSessionId) {
        console.log('Not this class session producer');
        return;
      }
      console.log('new producer', userId, producerId);
      this.peers.get(userId).createConsumer(producerId);
    } catch (error) {
      console.log(error);
    }
  }
  closeProducer(producerType) {
    let producerId;
    try {
      if (producerType === 'video') {
        producerId = this.videoProducer.id;
      } else if (producerType === 'screen') {
        producerId = this.screenProducer.id;
      }
      this.socket.emit(
        'closeCSP',
        {
          classSessionId: this.classSessionId,
          producerId,
        },
        ({closed}) => {
          if (!closed) {
            console.log('Producer not closed');
            return;
          }
          if (producerType === 'video') {
            this.videoProducer.close();
            this.videoProducer = null;
            console.log('Video producer closed');
          } else if (producerType === 'screen') {
            this.screenProducer.close();
            this.screenProducer = null;
            console.log('Screen producer closed');
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  pauseAudioProducer() {
    try {
      this.socket.emit(
        'pauseCSP',
        {
          classSessionId: this.classSessionId,
          producerId: this.audioProducer.id,
        },
        ({paused}) => {
          if (!paused) {
            console.log('Audio producer not paused');
            return;
          }
          this.audioProducer.pause();
          console.log('Audio producer paused');
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  resumeAudioProducer() {
    try {
      this.socket.emit(
        'resumeCSP',
        {
          classSessionId: this.classSessionId,
          producerId: this.audioProducer.id,
        },
        ({resumed}) => {
          if (!resumed) {
            console.log('Audio producer not resumed');
            return;
          }
          this.audioProducer.resume();
          console.log('Audio producer resumed');
        }
      );
    } catch (error) {
      console.log(error);
    }
  }
  closeConsumerTransport({ classSessionId, userId }) {
    try {
      if (this.classSessionId !== classSessionId) {
        console.log('Not this class session consumer transport');
        return;
      }
      store.dispatch(removePeer(userId));
      this.peers.get(userId).closeConsumerTransport();
      this.peers.delete(userId);
    } catch (error) {
      console.log(error);
    }
  }
}
