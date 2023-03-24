export const getIsMessagesLoading = (state) => state.messages.isLoading;

export const getMessagesByCurrentChannel = (state) => {
    const { currentChannelId } = state.channels;
    return state.messages.ids
        .map((messageId) => state.messages.entities[messageId])
        .filter((message) => message.channelId === currentChannelId);
};

export const getMessagesCountByChannel = (state) => {
    return getMessagesByCurrentChannel(state).length;
};
