import { channelsAdapter } from './slice';

export const getIsChannelsLoading = (state) => state.channels.isLoading;
export const getChannels = channelsAdapter.getSelectors((state) => state.channels).selectAll;
