import { channelsAdapter } from './slice';

export const getIsChannelsLoading = (state) => state.channels.isLoading;

export const getChannels = channelsAdapter.getSelectors((state) => state.channels).selectAll;

export const getCurrentChannelInfo = (state) => {
    const { currentChannelId } = state.channels;
    const messagesCount = state.channels.ids.length;

    return {
        channelInfo: state.channels.entities[currentChannelId],
        messagesCount,
    };
};
