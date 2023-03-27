import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice/slice';
import messagesSlice from './messagesSlice/slice';
import modalsSlice from './modalSlice/slice';

const store = configureStore({
  reducer: {
    channels: channelsSlice,
    messages: messagesSlice,
    modals: modalsSlice,
  },
  devTools: true,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});

export default store;
