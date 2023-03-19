import { useState, useRef } from 'react';
import { ArrowRightSquare } from 'react-bootstrap-icons';
import { useDispatch } from 'react-redux';
import { useChatApiContext } from '../../hooks/useChatApiContext';
import { addMessageAction } from '../../store/messagesSlice/slice';

export const AddMessageForm = () => {
    const [message, setMessage] = useState('');
    const { newMessage, socket } = useChatApiContext();
    const dispatch = useDispatch();
    const messageInputRef = useRef(null);

    const inputMessagehandler = (event) => {
        setMessage(event.target.value);
    };

    const submitHandler = (event) => {
        event.preventDefault();
        newMessage({ message });
        setMessage('');
        messageInputRef.current.focus();
    };
    return (
        <form noValidate className="py-1 border rounded-2 mx-5 my-3 mt-auto" onSubmit={submitHandler}>
            <div className="input-group has-validation">
                <input
                    ref={messageInputRef}
                    name="message"
                    value={message}
                    onChange={inputMessagehandler}
                    aria-label="Новое сообщение"
                    placeholder="Введите сообщение"
                    className="border-0 ps-2 p-0 form-control"
                    autoComplete="off"
                />
                <button type="submit" className="btn btn-group-vertical">
                    <ArrowRightSquare size={20} />
                </button>
            </div>
        </form>
    );
};
