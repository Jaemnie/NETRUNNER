import TerminalInteraction from './TerminalInteraction';
import { SocketResult } from './socket';

function Termi(terminal2, elements, socketRoomId) {
    let message = '';
    const socket = new SocketResult();
    socket.joinRoom(socketRoomId);
    const terminal = terminal2;
    terminal.open(elements);
    let currentInput = '';
    let commandHistory = [];
    let historyIndex = -1;

    terminal.write('넷러너에 오신걸 환영합니다!\r\n');
    terminal.onKey(({ key, domEvent }) => {
        const char = key;
        if (domEvent.keyCode === 13) {  // Enter key
            message = currentInput;
            if (message.trim() === 'clear') {
                terminal.clear();
                currentInput = '';
                historyIndex = commandHistory.length;  // reset history index
            } else {
                terminal.writeln('');
                commandHistory.push(currentInput);
                historyIndex = commandHistory.length;
                socket.sendMessage(message);
                TerminalInteraction.handleTerminalInput(message);
                socket.getMessage((chat) => {
                    terminal.write(chat);
                    terminal.writeln('');
                    chat = '';
                });
                currentInput = '';
            }
        } else if (domEvent.keyCode === 8) {  // Backspace
            if (currentInput.length > 0) {
                terminal.write('\b \b'); // Remove character from terminal
                currentInput = currentInput.slice(0, -1);
            }
        } else if (domEvent.keyCode === 38) {  // Up arrow key
            if (historyIndex > 0) {
                historyIndex--;
                currentInput = commandHistory[historyIndex];
                terminal.write('\r\x1b[K' + currentInput); // Clear the line and write the previous command
            }
        } else if (domEvent.keyCode === 40) {  // Down arrow key
            if (historyIndex < commandHistory.length - 1) {
                historyIndex++;
                currentInput = commandHistory[historyIndex];
                terminal.write('\r\x1b[K' + currentInput); // Clear the line and write the next command
            } else {
                historyIndex = commandHistory.length;
                currentInput = '';
                terminal.write('\r\x1b[K'); // Clear the line
            }
        } else if (domEvent.ctrlKey && domEvent.keyCode === 76) {  // Ctrl+L to clear the terminal
            terminal.clear();
            currentInput = '';  // 현재 입력도 초기화
        } else {
            currentInput += char;
            terminal.write(char);
        }
    });
}

export { Termi };
