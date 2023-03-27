import { useRef, memo } from 'react';
import { ListGroup, Button, Dropdown } from 'react-bootstrap/';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { changeCurrentChannel } from '../../store/channelsSlice/slice';
import { getCurrentChannelId, getChannels } from '../../store/channelsSlice/selectors';
import { openModal } from '../../store/modalSlice/slice';
import { ADD_CHANNEL_MODAL, REMOVE_CHANNEL_MODAL, RENAME_CHANNEL_MODAL } from '../../store/modalSlice/constants';

// eslint-disable-next-line
const Channels = memo(() => {
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
          <span className="text-white px-2">+</span>
        </Button>
      </div>

      <ListGroup className="pe-2 pb-2 overflow-auto h-100" ref={channelsListRef}>
        {channels.length
        && channels.map((channel) => (
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
                >
                  <span className="visually-hidden">Управление каналом</span>
                </Dropdown.Toggle>

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
        ))}
      </ListGroup>
    </>
  );
});

export default Channels;
