import { useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { getMessagesByCurrentChannel } from '../../store/messagesSlice/selectors';

const Messages = () => {
  const messages = useSelector(getMessagesByCurrentChannel);
  const messagesContainerRef = useRef({});

  useEffect(() => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div ref={messagesContainerRef} className="overflow-auto px-5">
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
