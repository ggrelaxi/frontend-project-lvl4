import { useSelector } from 'react-redux';
import { getCurrentChannelInfo } from '../../store/channelsSlice/selectors';

export const ChannelInfo = () => {
    const { channelInfo, messagesCount } = useSelector(getCurrentChannelInfo);
    return (
        <div className="bg-light px-4 py-3 mb-3">
            <div># {channelInfo?.name}</div>
            <div>{messagesCount} сообщений</div>
        </div>
    );
};
