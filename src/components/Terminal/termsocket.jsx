import TerminalInteraction from './TerminalInteraction';
import { SocketResult } from '../../socket/socket';

function Termi(terminal2, elements, socketRoomId) {
    let message = '';
    const socket = new SocketResult();
    socket.joinRoom(socketRoomId);
    const terminal = terminal2;
    terminal.open(elements);
    let currentInput = '';
    let commandHistory = [];
    let historyIndex = -1;

    terminal.write('넷러너에 오신걸 환영합니다!\r\n'); // 환영 메시지 출력
    terminal.onKey(({ key, domEvent }) => {
        const char = key;
        if (domEvent.keyCode === 13) {  // Enter key
            message = currentInput;
            if (message.trim() === 'clear') {
                terminal.clear(); // clear 명령어 처리
                currentInput = '';
                historyIndex = commandHistory.length;  // 히스토리 인덱스 리셋
            } else {
                terminal.writeln('');
                commandHistory.push(currentInput); // 명령어 히스토리에 추가
                historyIndex = commandHistory.length;
                socket.sendMessage(message); // 소켓을 통해 메시지 전송
                TerminalInteraction.handleTerminalInput(message); // 터미널 입력 처리
                socket.getMessage((chat) => {
                    terminal.write(chat); // 소켓에서 받은 메시지 출력
                    terminal.writeln('');
                    chat = '';
                });
                currentInput = '';
            }
        } else if (domEvent.keyCode === 8) {  // Backspace
            if (currentInput.length > 0) {
                terminal.write('\b \b'); // 터미널에서 문자 제거
                currentInput = currentInput.slice(0, -1);
            }
        } else if (domEvent.keyCode === 38) {  // Up arrow key
            if (historyIndex > 0) {
                historyIndex--;
                currentInput = commandHistory[historyIndex];
                terminal.write('\r\x1b[K' + currentInput); // 이전 명령어 출력
            }
        } else if (domEvent.keyCode === 40) {  // Down arrow key
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                currentInput = commandHistory[historyIndex];
                terminal.write('\r\x1b[K' + currentInput); // 다음 명령어 출력
            } else {
                historyIndex = commandHistory.length;
                currentInput = '';
                terminal.write('\r\x1b[K'); // 라인 클리어
            }
        } else if (domEvent.ctrlKey && domEvent.keyCode === 76) {  // Ctrl+L to clear the terminal
            terminal.clear();
            currentInput = '';  // 현재 입력도 초기화
        } else {
            currentInput += char;
            terminal.write(char); // 터미널에 입력된 문자 출력
        }
    });
}

export { Termi };
