import { useContext } from 'react';
import { ChatApiContext } from '../context';

const useChatApiContext = () => useContext(ChatApiContext);

export default useChatApiContext;
