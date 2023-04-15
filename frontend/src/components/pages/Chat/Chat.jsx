import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Col from 'react-bootstrap/Col';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import ChatPageContainer from './chat.styled';
import Channels from '../../Channels';
import Messages from '../../Messages/Messages';
import AddMessageForm from '../../AddMessageForm';
import ChannelInfo from '../../ChannelInfo';
import Modals from '../../modals';
import urls from '../../../urls/index';
import useAuthContext from '../../../hooks/useAuthContext';
import { addChannels } from '../../../store/channelsSlice/slice';
import { addMessages } from '../../../store/messagesSlice/slice';
import showNotification from '../../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../../Notification/notification-type';

const Chat = () => {
  const dispatch = useDispatch();
  const auth = useAuthContext();
  const navigate = useNavigate();
  const { t } = useTranslation();
  useEffect(() => {
    const getChatData = async () => {
      try {
        const res = await axios.get(urls.getChatData(), { headers: auth.getAuthHeader() });
        const { channels, currentChannelId, messages } = res.data;
        dispatch(addChannels({ channels, currentChannelId }));
        dispatch(addMessages({ messages }));
      } catch (err) {
        if (!err.isAxiosError) {
          showNotification(t('errors.commonError'), ERROR_NOTIFICATION);
          return;
        }

        if (err.response?.status === 401) {
          navigate(urls.loginPage());
          auth.logOut();
        } else {
          showNotification(t('errors.commonError'), ERROR_NOTIFICATION);
        }
      }
    };

    getChatData();
  }, [auth, dispatch, navigate, t]);

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
      <Modals />
    </>
  );
};

export default Chat;
