import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { setLocale } from 'yup';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import { Application } from './components/layout/Application/Application';
import { AuthContextProvider, ChatApiContextProvider, WordFilterContextProvider } from './context';
import { store } from './store/index';
import { ru } from './locale/ru';
import { Notification } from './components/Notification/Notification';

import './design/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const initApp = async () => {
    i18n.use(initReactI18next)
        .init({
            resources: {
                ru: {
                    translation: ru,
                },
            },
            lng: 'ru',
            fallbackLng: 'ru',
        })
        .then(() => {
            setLocale({
                mixed: {
                    required: () => ({ transKey: 'validation.required' }),
                    oneOf: () => ({ transKey: 'validation.oneOf' }),
                    notOneOf: () => ({ transKey: 'validation.notOneOf' }),
                },
                string: {
                    min: ({ min }) => ({ transKey: 'validation.minLength', min }),
                    max: ({ max }) => ({ transKey: 'validation.maxLength', max }),
                },
            });

            const root = ReactDOM.createRoot(document.getElementById('chat'));

            const rollbarConfig = {
                accessToken: '6a6b26e957504f2b9716468e8544172a',
                environment: 'testenv',
            };

            root.render(
                <RollbarProvider config={rollbarConfig}>
                    <ErrorBoundary>
                        <Provider store={store}>
                            <I18nextProvider i18n={i18n}>
                                <ChatApiContextProvider>
                                    <BrowserRouter>
                                        <WordFilterContextProvider>
                                            <AuthContextProvider>
                                                <Application />
                                                <Notification />
                                            </AuthContextProvider>
                                        </WordFilterContextProvider>
                                    </BrowserRouter>
                                </ChatApiContextProvider>
                            </I18nextProvider>
                        </Provider>
                    </ErrorBoundary>
                </RollbarProvider>
            );
        });
};

initApp();
