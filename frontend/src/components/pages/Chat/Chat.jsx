import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import ChatPageContainer from './chat.styled';
import { getIsChannelsLoading } from '../../../store/channelsSlice/selectors';
import { getIsMessagesLoading } from '../../../store/messagesSlice/selectors';
import Spinner from '../../common/Spinner/Spinner';
import Channels from '../../Channels';
import Messages from '../../Messages/Messages';
import AddMessageForm from '../../AddMessageForm';
import ChannelInfo from '../../ChannelInfo';
import Modals from '../../modals';
import { ChatServices } from '../../../api';
import { useAuthContext } from '../../../hooks/useAuthContext';

const Chat = () => {
  const dispatch = useDispatch();
  const { getAuthRequestHeader } = useAuthContext();
  const isChannelsLoading = useSelector(getIsChannelsLoading);
  const isMessagesLoading = useSelector(getIsMessagesLoading);
  const isDataFetching = isChannelsLoading && isMessagesLoading;

  useEffect(() => {
    dispatch(ChatServices.getChatData(getAuthRequestHeader));
  }, [dispatch, getAuthRequestHeader]);

  return (
    <>
      <ChatPageContainer className="row shadow rounded container p-0 mx-2 mx-sm-0 mx-md-0 mx-xl-0">
        <Col className="col-4 col-xl-2 border-end flex-column h-100 d-flex pe-0">
          <Channels />
        </Col>
        <Col className="d-flex flex-column h-100 bg-white p-0">
          <ChannelInfo />

          <Messages />

          <AddMessageForm />
        </Col>
      </ChatPageContainer>
      {isDataFetching && <Spinner />}
      <Modals />
    </>
  );
};

export default Chat;
