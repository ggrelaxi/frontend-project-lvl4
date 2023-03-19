import { channelsAdapter } from './slice';

export const getIsChannelsLoading = (state) => state.channels.isLoading;

export const getChannels = channelsAdapter.getSelectors((state) => state.channels).selectAll;

export const getChannelsCount = (state) => state.channels?.ids?.length;

export const getChannelsName = (state) => state.channels.ids.map((id) => state.channels.entities[id].name);

export const getCurrentChannelInfo = (state) => {
    const { currentChannelId } = state.channels;
    const messagesCount = state.channels.ids.length;

    return {
        channelInfo: state.channels.entities[currentChannelId],
        messagesCount,
    };
};

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getChannelIdToDelete = (state) => state.channels.channelIdToDelete;

export const getChannelIdToRename = (state) => state.channels.channelIdToRename;

export const getRenamedChannelName = (state) => {
    const { channelIdToRename } = state.channels;
    return state.channels.entities[channelIdToRename].name;
};
