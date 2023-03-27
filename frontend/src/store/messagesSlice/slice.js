import { createEntityAdapter, createSlice } from '@reduxjs/toolkit';
import getChatData from '../commonThunks';

export const messagesAdapter = createEntityAdapter();

const initialState = messagesAdapter.getInitialState({ isLoading: false });

const messagesSlice = createSlice({
  name: 'messages',
  initialState,
  reducers: {
    addMessage: messagesAdapter.addOne,
  },
  extraReducers: (builder) => {
    builder.addCase(getChatData.pending, (state) => {
      // eslint-disable-next-line
            state.isLoading = true;
    });
    builder.addCase(getChatData.fulfilled, (state, { payload: { data } }) => {
      messagesAdapter.addMany(state, data.messages);
      // eslint-disable-next-line
            state.isLoading = false;
    });
    builder.addCase(getChatData.rejected, (state) => {
      // eslint-disable-next-line
            state.isLoading = false;
    });
  },
});

export const { addMessage } = messagesSlice.actions;

export default messagesSlice.reducer;
