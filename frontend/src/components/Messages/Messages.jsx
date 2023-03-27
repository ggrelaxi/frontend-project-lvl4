import { useSelector } from 'react-redux';
import { getMessagesByCurrentChannel } from '../../store/messagesSlice/selectors';

const Messages = () => {
  const messages = useSelector(getMessagesByCurrentChannel);

  return (
    <div className="overflow-auto px-5">
      {messages.map(({ body, username, id }) => (
        <div key={id} className="text-break mb-2">
          <b>{username}</b>
          :
          {body}
        </div>
      ))}
    </div>
  );
};

export default Messages;
