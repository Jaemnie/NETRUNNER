import io from 'socket.io-client';
import { API } from '../config';

class SocketResult {
    constructor() {
        // Token은 인스턴스가 생성될 때 한 번만 설정되어야 합니다.
        const token = localStorage.getItem('accessToken');
        // this.socket을 사용해 클래스 내 다른 메소드에서도 소켓에 접근할 수 있습니다.
        this.socket = io(`${API.TERM}`, {
            query: { token }
        }); // NestJS 서버 주소

        // 메시지 리스너를 여기서 한번만 등록합니다.
        this.socket.on('message', (data) => {
            if(this.onMessageReceived) {
                this.onMessageReceived(data);
            }
        });
    }

    joinRoom(id){
        this.roomId = id;
        this.socket.emit('join',{roomId:`${id}roomId`});
    }

    getRoomId(){
        return this.roomId;
    }

    // 메시지를 받는 메소드
    getMessage(callback) {
        this.onMessageReceived = callback;
    }

    // 메시지를 보내는 메소드
    sendMessage(message) {
        this.socket.emit('message', {roomId:`${this.roomId}roomId`, payload: message});
    }

    leaveRoom(){
        this.socket.emit('leave',{roomId:`${this.roomId}`});
    }
}

export { SocketResult };
