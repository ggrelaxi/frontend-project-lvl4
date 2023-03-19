import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    activeModal: null,
};

const modalSlice = createSlice({
    name: 'modals',
    initialState,
    reducers: {
        openModal: (state, { payload: { modalTitle } }) => {
            state.activeModal = modalTitle;
        },
        closeModal: (state) => {
            state.activeModal = null;
        },
    },
});

export const { openModal, closeModal } = modalSlice.actions;

export default modalSlice.reducer;
