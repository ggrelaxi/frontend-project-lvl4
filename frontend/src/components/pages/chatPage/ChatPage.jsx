import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { ChatPageContainer } from './chatPage.styled';
import { getChatData } from '../../../store/commonThunks/index';
import { getIsChannelsLoading, getChannels } from '../../../store/channelsSlice/selectors';
import { getIsMessagesLoading } from '../../../store/messagesSlice/selectors';
import { AppSpinner } from '../../common/AppSpinner';
import { Channels } from '../../Channels';
import { AddMessageForm } from '../../AddMessageForm';
import { ChannelInfo } from '../../ChannelInfo';
import { Messages } from '../../Messages';

const ChatPage = () => {
    const dispatch = useDispatch();
    const isChannelsLoading = useSelector(getIsChannelsLoading);
    const isMessagesLoading = useSelector(getIsMessagesLoading);
    const channels = useSelector(getChannels);

    const isDataFetching = isChannelsLoading && isMessagesLoading;

    useEffect(() => {
        dispatch(getChatData());
    }, [dispatch]);

    return (
        <ChatPageContainer className="row shadow rounded">
            <Col className="col-4 col-xl-2 border-end">
                <Channels channels={channels} />
            </Col>
            <Col className="d-flex flex-column h-100 bg-white p-0">
                <ChannelInfo />

                <Messages />

                <AddMessageForm />
            </Col>

            {isDataFetching && <AppSpinner />}
        </ChatPageContainer>
    );
};

export default ChatPage;
