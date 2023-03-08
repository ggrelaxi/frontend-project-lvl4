import { useSelector } from 'react-redux';
import { getMessages } from '../../store/messagesSlice/selectors';

export const Messages = () => {
    const messages = useSelector(getMessages);

    return (
        <div className="overflow-auto px-5">
            {messages.map(({ message, id }) => {
                return (
                    <div key={id} className="text-break mb-2">
                        {message}
                    </div>
                );
            })}
        </div>
    );
};
