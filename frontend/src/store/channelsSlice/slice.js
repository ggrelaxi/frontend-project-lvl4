import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getChatData } from '../commonThunks';
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
            state.currentChannelId = channelId;
        },
        removeChannel: (state, { payload: { id } }) => {
            channelsAdapter.removeOne(state, id);
            if (state.currentChannelId === id) state.currentChannelId = DEFAULT_CHANNEL_ID;
        },
        renameChannel: channelsAdapter.updateOne,
    },
    extraReducers: (builder) => {
        builder.addCase(getChatData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getChatData.fulfilled, (state, { payload }) => {
            const { channels, currentChannelId } = payload.data;
            channelsAdapter.addMany(state, channels);
            state.isLoading = false;
            state.currentChannelId = currentChannelId;
        });
        builder.addCase(getChatData.rejected, (state) => {
            state.isLoading = false;
        });
        builder.addCase(closeModal, (state) => {
            state.channelIdToDelete = null;
        });
        builder.addCase(openModal, (state, { payload }) => {
            const { channelIdToDelete, channelIdToRename } = payload;
            if (channelIdToDelete) state.channelIdToDelete = channelIdToDelete;
            if (channelIdToRename) state.channelIdToRename = channelIdToRename;
        });
    },
});

export const { addChannel, changeCurrentChannel, renameChannel, removeChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
