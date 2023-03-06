import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import { getChatData } from '../commonThunks';

export const messagesAdapter = createEntityAdapter({ isLoading: false });

const initialState = messagesAdapter.getInitialState();

const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        addMessage: () => {},
    },
    extraReducers: (builder) => {
        builder.addCase(getChatData.pending, (state) => {
            state.isLoading = true;
        });
        builder.addCase(getChatData.fulfilled, (state, { payload: { data } }) => {
            messagesAdapter.addMany(state, data.messages);
            state.isLoading = false;
        });
        builder.addCase(getChatData.rejected, (state) => {
            state.isLoading = false;
        });
    },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
