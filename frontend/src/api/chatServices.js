import { io } from 'socket.io-client';
import showNotification from '../components/Notification/notification-emmiter';
import { SUCCESS_NOTIFICATION } from '../components/Notification/notification-type';
import { addChannels, setIsLoading } from '../store/channelsSlice/slice';
import { addMessages } from '../store/messagesSlice/slice';
import urls from '../urls';
import apiClient from './client';

// eslint-disable-next-line
export class ChatServices {
  static socket = io();

  static getChatData() {
    return async (dispatch) => {
      dispatch(setIsLoading(true));
      return apiClient.get(urls.getChatData())
        .then((response) => {
          const { channels, currentChannelId, messages } = response.data;
          dispatch(addChannels({ channels, currentChannelId }));
          dispatch(addMessages({ messages }));
        })
        .finally(() => dispatch(setIsLoading(false)));
    };
  }

  static async newMessage(message, cb) {
    // eslint-disable-next-line
    this.socket.emit('newMessage', message, (response) => {
      if (response.status === 'ok') {
        cb();
      } else {
        cb(new Error());
      }
    });
  }

  static async newChannel(channel, cb) {
    // eslint-disable-next-line
    this.socket.emit('newChannel', channel, (response) => {
      if (response.status === 'ok') {
        cb(null, response.data);
      } else {
        cb(new Error());
      }
    });
  }

  static async renameChannel(channel, cb) {
    // eslint-disable-next-line
    this.socket.emit('renameChannel', channel, (response) => {
      if (response.status === 'ok') {
        cb();
      } else {
        cb(new Error());
      }
    });
  }

  static async removeChannel(channelId, cb) {
    // eslint-disable-next-line
    this.socket.emit('removeChannel', { id: channelId }, (response) => {
      if (response.status === 'ok') {
        cb();
      } else {
        cb(new Error());
      }
    });
  }

  static initSocketLinteners(dispatch, actions, translator) {
    // eslint-disable-next-line
    this.socket.on('newMessage', (response) => {
      dispatch(actions.addMessageAction(response));
    });

    // eslint-disable-next-line
    this.socket.on('newChannel', () => {
    // eslint-disable-next-line
      dispatch(this.getChatData());
    });

    // eslint-disable-next-line
    this.socket.on('renameChannel', (response) => {
      dispatch(actions.renameChannelAction({ id: response.id, changes: response }));
      showNotification(translator('notifications.renameChannel'), SUCCESS_NOTIFICATION);
    });

    // eslint-disable-next-line
    this.socket.on('removeChannel', ({ id }) => {
      dispatch(actions.removeChannelAction({ id }));
      showNotification(translator('notifications.removeChannel'), SUCCESS_NOTIFICATION);
    });
  }

  static unsubscribeSocketListeners() {
    // eslint-disable-next-line
    this.socket.off('newMessage');
    // eslint-disable-next-line
    this.socket.off('newChannel');
    // eslint-disable-next-line
    this.socket.off('removeChannel');
    // eslint-disable-next-line
    this.socket.off('renameChannel');
  }
}
