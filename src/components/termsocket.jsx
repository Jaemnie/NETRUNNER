
import {SocketResult} from "./socket";
import { TerminalInteraction } from './TerminalInteraction';

function Termi(terminal2,elements) {
    let message = '';
    const sockets = new SocketResult();
    const terminal = terminal2;
    terminal.open(elements);
    let currentInput = '';
    terminal.write('Welcome to NetRunner!\r\n');
    terminal.onKey(({ key, domEvent }) => {
        const char = key;
        if (domEvent.keyCode === 13) {  // Enter key
            message = currentInput;
            terminal.writeln('');
            sockets.sendMessage(message);
            TerminalInteraction.handleTerminalInput(message);
            sockets.getMessage((chat) => {
                terminal.write(chat);
                terminal.writeln('');
                chat= '';
            });
            currentInput = '';
        } else if (domEvent.keyCode === 8) {
            // Backspace 처리
            if (currentInput.length > 0) {
                terminal.write('\b \b'); // 터미널에서 문자를 제거
                currentInput = currentInput.slice(0, -1);
            }
        } else {
            currentInput += char;
            terminal.write(char);
        }
    });
}

export { Termi };

