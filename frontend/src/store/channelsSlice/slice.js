import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getChatData } from '../commonThunks';
import { DEFAULT_CHANNEL_ID } from '../../config';

export const channelsAdapter = createEntityAdapter();

const initialState = channelsAdapter.getInitialState({ isLoading: false, currentChannelId: DEFAULT_CHANNEL_ID });

const channelsSlice = createSlice({
    name: 'channels',
    initialState,
    reducers: {
        addChannel: () => {},
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
    },
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
