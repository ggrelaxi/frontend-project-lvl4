import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CHANNEL_ID } from '../../config';

export const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  currentChannelId: DEFAULT_CHANNEL_ID,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: (state, { payload }) => {
      channelsAdapter.addOne(state, payload);
    },
    addChannels: (state, { payload }) => {
      const { channels } = payload;
      // eslint-disable-next-line
      channelsAdapter.addMany(state, channels);
    },
    changeCurrentChannel: (state, { payload: { channelId } }) => {
      // eslint-disable-next-line
      state.currentChannelId = channelId;
    },
    removeChannel: (state, { payload: { id } }) => {
      channelsAdapter.removeOne(state, id);
      // eslint-disable-next-line
      if (state.currentChannelId === id) state.currentChannelId = DEFAULT_CHANNEL_ID;
    },
    renameChannel: (state, { payload }) => {
      const { id, name } = payload;
      // eslint-disable-next-line
      state.entities[id].name = name;
    },
  },
});

export const {
  addChannel, changeCurrentChannel, renameChannel, removeChannel, addChannels,
} = channelsSlice.actions;

export default channelsSlice.reducer;
