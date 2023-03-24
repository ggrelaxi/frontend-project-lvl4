import { useRef } from 'react';
import { ListGroup, Button, Dropdown } from 'react-bootstrap/';
import { PlusSquare } from 'react-bootstrap-icons';
import { useDispatch, useSelector } from 'react-redux';
import { changeCurrentChannel } from '../../store/channelsSlice/slice';
import { getCurrentChannelId, getChannels } from '../../store/channelsSlice/selectors';
import { openModal } from '../../store/modalSlice/slice';
import { showNotification } from '../Notification/notification-emmiter';
import { ADD_CHANNEL_MODAL, REMOVE_CHANNEL_MODAL, RENAME_CHANNEL_MODAL } from '../../store/modalSlice/constants';
import { useTranslation } from 'react-i18next';

export const Channels = React.memo(() => {
    const { t } = useTranslation();
    const currentChannelId = useSelector(getCurrentChannelId);
    const channels = useSelector(getChannels);

    const dispatch = useDispatch();
    const channelsListRef = useRef(null);

    const changeCurrentChannelHandler = (channelId) => () => {
        dispatch(changeCurrentChannel({ channelId }));
    };

    const addChannelHandler = () => {
        dispatch(openModal({ modalTitle: ADD_CHANNEL_MODAL }));
    };

    const openRemoveChannelModal = (channelIdToDelete) => () => {
        dispatch(openModal({ modalTitle: REMOVE_CHANNEL_MODAL, channelIdToDelete }));
    };

    const openRenameChannelModal = (channelIdToRename) => () => {
        dispatch(openModal({ modalTitle: RENAME_CHANNEL_MODAL, channelIdToRename }));
    };

    return (
        <>
            <div className="p-4 px-2 d-flex justify-content-between">
                <div className="fw-bold">{t('chat.channels')}</div>
                <Button className="p-0 text-primary btn btn-group-vertical" onClick={addChannelHandler}>
                    <PlusSquare fill="white" color="blue" size={20} />
                </Button>
            </div>

            <ListGroup className="pe-2 pb-2 overflow-auto h-100" ref={channelsListRef}>
                {channels.length &&
                    channels.map((channel) => {
                        return (
                            <ListGroup.Item
                                key={channel.id}
                                className="bg-transparent border-0 p-0 d-flex show dropdown btn-group"
                            >
                                <button
                                    type="button"
                                    className={`w-100 rounded-0 text-start btn text-nowrap text-truncate ${
                                        channel.id === currentChannelId && 'btn-secondary'
                                    }`}
                                    onClick={changeCurrentChannelHandler(channel.id)}
                                >
                                    <span># </span>
                                    {channel.name}
                                </button>
                                {channel.removable && (
                                    <Dropdown>
                                        <Dropdown.Toggle
                                            className="rounded-0"
                                            variant={`${channel.id === currentChannelId && 'secondary'}`}
                                        ></Dropdown.Toggle>

                                        <Dropdown.Menu>
                                            <Dropdown.Item onClick={openRemoveChannelModal(channel.id)}>
                                                {t('chat.delete')}
                                            </Dropdown.Item>
                                            <Dropdown.Item onClick={openRenameChannelModal(channel.id)}>
                                                {t('chat.rename')}
                                            </Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                )}
                            </ListGroup.Item>
                        );
                    })}
            </ListGroup>
        </>
    );
});
