import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { I18nextProvider } from 'react-i18next';
import { Provider } from 'react-redux';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { App } from './components/layout/App';
import { AuthContextProvider, ChatApiContextProvider } from './context';
import { store } from './store/index';
import i18n from './locale/index';
import { Notification } from './components/Notification/Notification';

import './design/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('chat'));

const rollbarConfig = {
    accessToken: '6a6b26e957504f2b9716468e8544172a',
    environment: 'production',
};

root.render(
    <RollbarProvider config={rollbarConfig}>
        <ErrorBoundary>
            <Provider store={store}>
                <I18nextProvider i18n={i18n}>
                    <ChatApiContextProvider>
                        <BrowserRouter>
                            <AuthContextProvider>
                                <App />
                                <Notification />
                            </AuthContextProvider>
                        </BrowserRouter>
                    </ChatApiContextProvider>
                </I18nextProvider>
            </Provider>
        </ErrorBoundary>
    </RollbarProvider>
);
