import { useState, useRef } from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { useWordFilterContext } from '../../hooks/useWordFilterContext';
import { getCurrentChannelId } from '../../store/channelsSlice/selectors';
import { useAuthContext } from '../../hooks/useAuthContext';
import { ChatServices } from '../../api';
import { showNotification } from '../Notification/notification-emmiter';
import { ERROR_NOTIFICATION } from '../Notification/notification-type';

export const AddMessageForm = () => {
    const [message, setMessage] = useState('');

    const channelId = useSelector(getCurrentChannelId);

    const {
        user: { username },
    } = useAuthContext();
    const { wordFilter } = useWordFilterContext();
    const { t } = useTranslation();
    const messageInputRef = useRef(null);

    const inputMessagehandler = (event) => {
        setMessage(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        const newMessage = { body: wordFilter.clean(message), channelId, username };

        ChatServices.newMessage(newMessage, (error = null) => {
            if (error) {
                showNotification(t('notifications.newMessageError'), ERROR_NOTIFICATION);
            } else {
                messageInputRef.current.focus();
                setMessage('');
            }
        });
    };

    return (
        <form noValidate className="py-1 border rounded-2 mx-5 my-3 mt-auto" onSubmit={submitHandler}>
            <div className="input-group has-validation">
                <input
                    ref={messageInputRef}
                    name="message"
                    value={message}
                    onChange={inputMessagehandler}
                    placeholder={t('chat.enterMessage')}
                    className="border-0 ps-2 p-0 form-control"
                    autoComplete="off"
                    aria-label="Новое сообщение"
                />
                <button type="submit" className="btn btn-group-vertical">
                    <ArrowRightSquare size={20} />
                </button>
            </div>
        </form>
    );
};
