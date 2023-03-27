import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { getCurrentChannelInfo } from '../../store/channelsSlice/selectors';
import { getMessagesCountByChannel } from '../../store/messagesSlice/selectors';

const ChannelInfo = () => {
  const channelInfo = useSelector(getCurrentChannelInfo);
  const messagesCount = useSelector(getMessagesCountByChannel);
  const { t } = useTranslation();

  return (
    <div className="bg-light px-4 py-3 mb-3">
      <div>
        #&nbsp;
        {channelInfo?.name}
      </div>
      <div>{t('messages.counter', { count: messagesCount })}</div>
    </div>
  );
};

export default ChannelInfo;
