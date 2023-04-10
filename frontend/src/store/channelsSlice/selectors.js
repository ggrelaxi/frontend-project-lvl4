import { channelsAdapter } from './slice';

export const getChannels = channelsAdapter.getSelectors((state) => state.channels).selectAll;

export const getChannelsCount = (state) => state.channels?.ids?.length;

export const getChannelsName = ({ channels }) => channels.ids.map(
  (id) => channels.entities[id].name,
);

export const getCurrentChannelId = (state) => state.channels.currentChannelId;

export const getRenamedChannelName = (state) => {
  const { channelIdToRename } = state.modals;
  return state.channels.entities[channelIdToRename].name;
};

export const getCurrentChannelInfo = (state) => {
  const { currentChannelId } = state.channels;
  return state.channels.entities[currentChannelId];
};
