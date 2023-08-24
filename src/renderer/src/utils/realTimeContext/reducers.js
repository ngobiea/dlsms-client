export const SET_VIDEO_AND_AUDIO_STREAM = 'SET_VIDEO_AND_AUDIO_STREAM';
export const ADD_NEW_CONSUMER = 'ADD_NEW_CONSUMER';
export const ADD_CONSUMING_TRANSPORT = 'ADD_CONSUMING_TRANSPORT';
export const REMOVE_CONSUMER = 'REMOVE_CONSUMER';
export const mediasoupReducer = (state, action) => {
  if (action.type === SET_VIDEO_AND_AUDIO_STREAM) {
    return {
      ...state,
      audioParams: {
        track: action.payload.getAudioTracks()[0],
        ...state.audioParams,
      },
      videoParams: {
        track: action.payload.getVideoTracks()[0],
        ...state.videoParams,
      },
    };
  }
  if (action.type === ADD_NEW_CONSUMER) {
    return {
      ...state,
      consumerTransports: [...state.consumerTransports, action.payload],
    };
  }
  if (action.type === ADD_CONSUMING_TRANSPORT) {
    return {
      ...state,
      consumingTransports: [...state.consumingTransports, action.payload],
    };
  }
  if (action.type === REMOVE_CONSUMER) {
    return {
      ...state,
      consumerTransports: state.consumerTransports.filter(
        (consumer) => consumer.id !== action.payload
      ),
    };
  }

  return state;
};
