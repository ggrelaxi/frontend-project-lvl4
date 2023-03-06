import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getChatData } from '../commonThunks';

export const channelsAdapter = createEntityAdapter({ isLoading: false });

const initialState = channelsAdapter.getInitialState();

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
        builder.addCase(getChatData.fulfilled, (state, { payload: { data } }) => {
            channelsAdapter.addMany(state, data.channels);
            state.isLoading = false;
        });
        builder.addCase(getChatData.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { addChannel } = channelsSlice.actions;

export default channelsSlice.reducer;
