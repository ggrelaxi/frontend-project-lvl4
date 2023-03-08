import { io } from 'socket.io-client';

export class ChatServices {
    static socket = io();

    static newMessage(message) {
        this.socket.emit('newMessage', message, (response) => {
            if (response.status === 'ok') {
                console.log('ok');
            } else {
                console.log('не ок');
            }
        });
    }

    static async addChannel(channel, cb) {
        this.socket.emit('addChannel', channel, (response) => {});
    }

    static async renameChannel(channel, cb) {
        this.socket.emit('renameChannel', channel, (response) => {});
    }

    static async removeChannel(channel, cb) {
        this.socket.emit('removeChannel', channel, (response) => {});
    }

    static initSocketLinteners(dispatch, actions) {
        this.socket.on('newMessage', (response) => {
            dispatch(actions.addMessage(response));
        });
    }
}
