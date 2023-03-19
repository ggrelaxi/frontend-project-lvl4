import { io } from 'socket.io-client';

export class ChatServices {
    static socket = io();

    static async newMessage(message, cb) {
        this.socket.emit('newMessage', message, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                console.log('не ок');
            }
        });
    }

    static async newChannel(channel, cb) {
        this.socket.emit('newChannel', channel, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                console.log('не ок');
            }
        });
    }

    static async renameChannel(channel, cb) {
        this.socket.emit('renameChannel', channel, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                console.log('не ок');
            }
        });
    }

    static async removeChannel(channelId, cb) {
        this.socket.emit('removeChannel', { id: channelId }, (response) => {
            if (response.status === 'ok') {
                cb();
            } else {
                console.log('не ок');
            }
        });
    }

    static initSocketLinteners(dispatch, actions) {
        this.socket.on('newMessage', (response) => {});

        this.socket.on('newChannel', (response) => {
            dispatch(actions.addChannelAction(response));
            dispatch(actions.changeCurrentChannelAction({ channelId: response.id }));
        });

        this.socket.on('renameChannel', (response) => {
            dispatch(actions.renameChannelAction({ id: response.id, changes: response }));
        });

        this.socket.on('removeChannel', ({ id }) => {
            dispatch(actions.removeChannelAction({ id }));
        });
    }

    static unsubscribeSocketListeners() {
        this.socket.off('newMessage');
        this.socket.off('newChannel');
        this.socket.off('removeChannel');
        this.socket.off('renameChannel');
    }
}
