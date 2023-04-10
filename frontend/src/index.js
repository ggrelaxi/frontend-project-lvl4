import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import { io } from 'socket.io-client';
import { Provider } from 'react-redux';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import i18n from 'i18next';
import { setLocale } from 'yup';
import { Provider as RollbarProvider, ErrorBoundary } from '@rollbar/react';
import Application from './components/layout/Application/Application';
import { AuthContextProvider, ChatApiContext, WordFilterContextProvider } from './context';
import store from './store/index';
import ru from './locale/ru';
import Notification from './components/Notification/Notification';
import { addMessage } from './store/messagesSlice/slice';
import { addChannel, removeChannel, renameChannel } from './store/channelsSlice/slice';

import './design/main.scss';
import 'bootstrap/dist/css/bootstrap.min.css';

const initApp = async () => {
  const socket = io();
  socket.on('newMessage', (payload) => {
    store.dispatch(addMessage(payload));
  });
  socket.on('newChannel', (payload) => {
    store.dispatch(addChannel(payload));
  });
  socket.on('removeChannel', (payload) => {
    store.dispatch(removeChannel(payload));
  });
  socket.on('renameChannel', (payload) => {
    store.dispatch(renameChannel({
      id: payload.id,
      name: payload.name,
    }));
  });

  const withAcknowledgement = (socketFunc) => (...args) => new Promise((resolve, reject) => {
    let state = 'pending'; // eslint-disable-line
    const timer = setTimeout(() => {
      state = 'rejected';
      reject();
    }, 3000);

    socketFunc(...args, (response) => {
      if (state !== 'pending') return;

      clearTimeout(timer);

      if (response.status === 'ok') {
        state = 'resolved';
        resolve(response.data);
      }

      reject();
    });
  });

  const api = {
    newMessage: withAcknowledgement((...params) => socket.emit('newMessage', ...params)),
    newChannel: withAcknowledgement((...params) => socket.emit('newChannel', ...params)),
    removeChannel: withAcknowledgement((...params) => socket.emit('removeChannel', ...params)),
    renameChannel: withAcknowledgement((...params) => socket.emit('renameChannel', ...params)),
  };

  const i18instance = i18n.createInstance();

  i18instance
    .use(initReactI18next)
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
        accessToken: process.env.ROLLBAR_TOKEN,
        environment: 'testenv',
      };
      root.render(
        <RollbarProvider config={rollbarConfig}>
          <ErrorBoundary>
            <Provider store={store}>
              <I18nextProvider i18n={i18instance}>
                <ChatApiContext.Provider value={api}>
                  <BrowserRouter>
                    <WordFilterContextProvider>
                      <AuthContextProvider>
                        <Application />
                        <Notification />
                      </AuthContextProvider>
                    </WordFilterContextProvider>
                  </BrowserRouter>
                </ChatApiContext.Provider>
              </I18nextProvider>
            </Provider>
          </ErrorBoundary>
        </RollbarProvider>,
      );
    });
};

initApp();
