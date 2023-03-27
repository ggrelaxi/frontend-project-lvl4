import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  activeModal: null,
};

const modalSlice = createSlice({
  name: 'modals',
  initialState,
  reducers: {
    openModal: (state, { payload: { modalTitle } }) => {
      // eslint-disable-next-line
            state.activeModal = modalTitle;
    },
    closeModal: (state) => {
      // eslint-disable-next-line
            state.activeModal = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
