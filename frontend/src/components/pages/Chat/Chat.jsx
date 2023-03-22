import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Col from 'react-bootstrap/Col';
import { ChatPageContainer } from './chat.styled';
import { getChatData } from '../../../store/commonThunks/index';
import { getIsChannelsLoading } from '../../../store/channelsSlice/selectors';
import { getIsMessagesLoading } from '../../../store/messagesSlice/selectors';
import { AppSpinner } from '../../common/AppSpinner';
import { Channels } from '../../Channels';
import { AddMessageForm } from '../../AddMessageForm';
import { ChannelInfo } from '../../ChannelInfo';
import { Messages } from '../../Messages';
import { AddChannelModal, RemoveChannelModal, RenameChannelModal } from '../../modals';
import { ADD_CHANNEL_MODAL, REMOVE_CHANNEL_MODAL, RENAME_CHANNEL_MODAL } from '../../../store/modalSlice/constants';
import { getActiveModal } from '../../../store/modalSlice/selectors';

const ChatPage = () => {
    const dispatch = useDispatch();
    const isChannelsLoading = useSelector(getIsChannelsLoading);
    const isMessagesLoading = useSelector(getIsMessagesLoading);
    const activeModal = useSelector(getActiveModal);

    const isDataFetching = isChannelsLoading && isMessagesLoading;

    useEffect(() => {
        dispatch(getChatData());
    }, [dispatch]);

    const renderModal = (modal) => {
        /* eslint-disable indent */

        switch (modal) {
            case ADD_CHANNEL_MODAL:
                return <AddChannelModal />;
            case REMOVE_CHANNEL_MODAL:
                return <RemoveChannelModal />;
            case RENAME_CHANNEL_MODAL:
                return <RenameChannelModal />;
            default:
                return null;
        }
        /* eslint-enable indent */
    };

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
            {isDataFetching && <AppSpinner />}
            {renderModal(activeModal)}
        </>
    );
};

export default ChatPage;
