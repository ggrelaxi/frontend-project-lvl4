import { useMemo, createContext, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { ChatServices } from '../api';
import { addMessage as addMessageAction } from '../store/messagesSlice/slice';
import {
    addChannel as addChannelAction,
    changeCurrentChannel as changeCurrentChannelAction,
    removeChannel as removeChannelAction,
    renameChannel as renameChannelAction,
} from '../store/channelsSlice/slice';
import { useTranslation } from 'react-i18next';

export const ChatApiContext = createContext();

const newMessage = (message) => {
    ChatServices.newMessage(message);
};

export const ChatApiContextProvider = ({ children }) => {
    const { newChannel, renameChannel, removeChannel, socket } = ChatServices;
    const dispatch = useDispatch();
    const { t: translator } = useTranslation();

    const contextValue = useMemo(() => {
        return { newMessage, newChannel, renameChannel, removeChannel, socket };
    }, [newChannel, renameChannel, removeChannel, socket]);

    const actions = useMemo(
        () => ({
            addChannelAction,
            changeCurrentChannelAction,
            renameChannelAction,
            removeChannelAction,
            addMessageAction,
        }),
        []
    );

    useEffect(() => {
        ChatServices.initSocketLinteners(dispatch, actions, translator);

        return () => {
            ChatServices.unsubscribeSocketListeners();
        };
    }, [actions, dispatch]);

    return <ChatApiContext.Provider value={contextValue}>{children}</ChatApiContext.Provider>;
};
