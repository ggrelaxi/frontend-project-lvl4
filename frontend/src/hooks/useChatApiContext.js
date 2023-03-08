import { useContext } from 'react';
import { ChatApiContext } from '../context';

export const useChatApiContext = () => {
    return useContext(ChatApiContext);
};
