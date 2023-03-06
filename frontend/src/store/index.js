import { configureStore } from '@reduxjs/toolkit';
import channelsSlice from './channelsSlice/slice';
import messagesSlice from './messagesSlice/slice';

export const store = configureStore({
    reducer: {
        channels: channelsSlice,
        messages: messagesSlice,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
});
