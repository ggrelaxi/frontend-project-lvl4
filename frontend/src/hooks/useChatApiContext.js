import { useContext } from 'react';
import { ChatApiContext } from '../context';

const useChatApiContext = () => {
  const context = useContext(ChatApiContext);
  return context;
};

export default useChatApiContext;
