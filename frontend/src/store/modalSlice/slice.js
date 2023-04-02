import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
  channelIdToDelete: null,
  channelIdToRename: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload }) => {
      // eslint-disable-next-line
      state.activeModal = payload.modalTitle;
      const { channelIdToDelete, channelIdToRename } = payload;
      // eslint-disable-next-line
      if (channelIdToDelete) state.channelIdToDelete = channelIdToDelete;
      // eslint-disable-next-line
      if (channelIdToRename) state.channelIdToRename = channelIdToRename;
    },
    closeModal: (state) => {
      // eslint-disable-next-line
      state.activeModal = null;
      // eslint-disable-next-line
      state.channelIdToDelete = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
