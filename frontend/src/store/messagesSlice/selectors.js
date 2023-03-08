import { messagesAdapter } from './slice';

export const getIsMessagesLoading = (state) => state.messages.isLoading;

export const getMessages = messagesAdapter.getSelectors((state) => state.messages).selectAll;
