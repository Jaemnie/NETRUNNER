import io from 'socket.io-client';
import { API } from '../config';

class SocketResult {
    constructor() {
        const token = localStorage.getItem('accessToken');
        this.socket = io(`${API.GUI}`, {
            query: { token }
        });

        this.socket.on('message', (data) => {
            if (this.onMessageReceived) {
                this.onMessageReceived(data);
            }
        });
    }

    joinRoom(id) {
        this.roomId = id;
        this.socket.emit('join', { roomId: `${id}roomId` });
    }

    getRoomId() {
        return this.roomId;
    }

    getMessage(callback) {
        this.onMessageReceived = callback;
    }

    sendMessage(message) {
        this.socket.emit('message', { roomId: `${this.roomId}roomId`, payload: `${message}` });
    }

    leaveRoom() {
        this.socket.emit('leave', { roomId: `${this.roomId}roomId` });
    }
}

export { SocketResult };