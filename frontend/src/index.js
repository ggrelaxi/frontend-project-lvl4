import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { App } from './components/layout/App';
import { AuthContextProvider, ChatApiContextProvider } from './context';
import { store } from './store/index';
import i18n from './locale/index';

import './design/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('chat'));
root.render(
    <Provider store={store}>
        <I18nextProvider i18n={i18n}>
            <ChatApiContextProvider>
                <BrowserRouter>
                    <AuthContextProvider>
                        <App />
                    </AuthContextProvider>
                </BrowserRouter>
            </ChatApiContextProvider>
        </I18nextProvider>
    </Provider>
);
