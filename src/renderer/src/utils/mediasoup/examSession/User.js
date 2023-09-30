export class User {
  constructor() {
    this.consumerStreams = new Map();
    this.user = null;
    this.appData = null;
  }

  setTransportId(transportId) {
    this.transportId = transportId;
  }
  addConsumerStream(consumerId, stream, appData, userData) {
    let type;
    if (appData.video) {
      type = 'video';
    } else if (appData.audio) {
      type = 'audio';
    } else if (appData.screen) {
      type = 'screen';
    }
    const consumerStream = { stream, type };
    this.consumerStreams.set(consumerId, consumerStream);
  }
  removeConsumerStream(consumerId) {
    delete this.consumerStreams[consumerId];
  }
  getConsumerStream(consumerId) {
    return this.consumerStreams[consumerId];
  }
  getConsumerStreams() {
    return this.consumerStreams;
  }
  setUserData(userData) {
    this.userData = userData;
  }
  getUserData() {
    let streams= {}
    this.consumerStreams.forEach((consumerStream) => {
      streams[consumerStream.type] = consumerStream.stream;
    });
    return {
      user: this.userData,
      streams,
    };
  }
}
