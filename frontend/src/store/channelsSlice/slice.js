import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { DEFAULT_CHANNEL_ID } from '../../config';

export const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  isLoading: false,
  currentChannelId: DEFAULT_CHANNEL_ID,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
    addChannels: (state, { payload }) => {
      const { channels, currentChannelId } = payload;
      // eslint-disable-next-line
      state.currentChannelId = currentChannelId;
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
    renameChannel: channelsAdapter.updateOne,
    setIsLoading: (state, payload) => {
      // eslint-disable-next-line
      state.isLoading = payload;
    },
  },
});

export const {
  addChannel, changeCurrentChannel, renameChannel, removeChannel, setIsLoading, addChannels,
} = channelsSlice.actions;

export default channelsSlice.reducer;
