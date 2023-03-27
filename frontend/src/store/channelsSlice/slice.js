import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getChatData from '../commonThunks';
import { DEFAULT_CHANNEL_ID } from '../../config';
import { closeModal, openModal } from '../modalSlice/slice';

export const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({
  isLoading: false,
  currentChannelId: DEFAULT_CHANNEL_ID,
  channelIdToDelete: null,
  channelIdToRename: null,
});

const channelsSlice = createSlice({
  name: 'channels',
  initialState,
  reducers: {
    addChannel: channelsAdapter.addOne,
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
  },
  extraReducers: (builder) => {
    builder.addCase(getChatData.pending, (state) => {
      // eslint-disable-next-line
            state.isLoading = true;
    });
    builder.addCase(getChatData.fulfilled, (state, { payload }) => {
      const { channels, currentChannelId } = payload.data;
      channelsAdapter.addMany(state, channels);
      // eslint-disable-next-line
            state.isLoading = false;
      // eslint-disable-next-line
            state.currentChannelId = currentChannelId;
    });
    builder.addCase(getChatData.rejected, (state) => {
      // eslint-disable-next-line
            state.isLoading = false;
    });
    builder.addCase(closeModal, (state) => {
      // eslint-disable-next-line
            state.channelIdToDelete = null;
    });
    builder.addCase(openModal, (state, { payload }) => {
      const { channelIdToDelete, channelIdToRename } = payload;
      // eslint-disable-next-line
            if (channelIdToDelete) state.channelIdToDelete = channelIdToDelete;
      // eslint-disable-next-line
            if (channelIdToRename) state.channelIdToRename = channelIdToRename;
    });
  },
});

export const {
  addChannel, changeCurrentChannel, renameChannel, removeChannel,
} = channelsSlice.actions;

export default channelsSlice.reducer;
