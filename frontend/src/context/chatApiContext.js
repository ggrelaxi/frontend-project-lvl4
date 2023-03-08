import { useMemo, createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChatServices } from '../api';
import { addMessage } from '../store/messagesSlice/slice';

export const ChatApiContext = createContext();

const newMessage = (message) => {
    ChatServices.newMessage(message);
};

export const ChatApiContextProvider = ({ children }) => {
    const { addChannel, renameChannel, removeChannel, socket } = ChatServices;
    const dispatch = useDispatch();

    const contextValue = useMemo(() => {
        return { newMessage, addChannel, renameChannel, removeChannel, socket };
    }, [newMessage, addChannel, renameChannel, removeChannel, socket]);

    const actions = {
        addMessage,
    };

    useEffect(() => {
        ChatServices.initSocketLinteners(dispatch, actions);
    }, []);

    return <ChatApiContext.Provider value={contextValue}>{children}</ChatApiContext.Provider>;
};
