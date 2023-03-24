import { io } from 'socket.io-client';
import { showNotification } from '../components/Notification/notification-emmiter';
import { SUCCESS_NOTIFICATION, ERROR_NOTIFICATION } from '../components/Notification/notification-type';

export class ChatServices {
    static socket = io();

    static async newMessage(message, cb) {
        this.socket.emit('newMessage', message, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                showNotification(translator('notifications.newMessageError'), SUCCESS_NOTIFICATION);
            }
        });
    }

    static async newChannel(channel, cb) {
        this.socket.emit('newChannel', channel, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                cb(new Error());
            }
        });
    }

    static async renameChannel(channel, cb) {
        this.socket.emit('renameChannel', channel, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                cb(new Error());
            }
        });
    }

    static async removeChannel(channelId, cb) {
        this.socket.emit('removeChannel', { id: channelId }, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                cb(new Error());
            }
        });
    }

    static initSocketLinteners(dispatch, actions, translator) {
        this.socket.on('newMessage', () => {});

        this.socket.on('newChannel', (response) => {
            dispatch(actions.addChannelAction(response));
            dispatch(actions.changeCurrentChannelAction({ channelId: response.id }));
            showNotification(translator('notifications.newChannel'), SUCCESS_NOTIFICATION);
        });

        this.socket.on('renameChannel', (response) => {
            dispatch(actions.renameChannelAction({ id: response.id, changes: response }));
            showNotification(translator('notifications.renameChannel'), SUCCESS_NOTIFICATION);
        });

        this.socket.on('removeChannel', ({ id }) => {
            dispatch(actions.removeChannelAction({ id }));
            showNotification(translator('notifications.removeChannel'), SUCCESS_NOTIFICATION);
        });
    }

    static unsubscribeSocketListeners() {
        this.socket.off('newMessage');
        this.socket.off('newChannel');
        this.socket.off('removeChannel');
        this.socket.off('renameChannel');
    }
}
