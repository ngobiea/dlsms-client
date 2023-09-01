import { createSlice } from '@reduxjs/toolkit';

const mediasoupSlice = createSlice({
  name: 'mediasoup',
  initialState: {
    producerTransport: [],
  },
  reducers: {
    setProducerTransport(state, action) {
      state.producerTransport.push(action.payload);
    },
  },
});

export const { setProducerTransport } = mediasoupSlice.actions;
export const mediasoupReducer = mediasoupSlice.reducer;
