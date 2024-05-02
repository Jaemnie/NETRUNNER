
import {SocketResult} from "./socket";

function Termi(terminal2,elements) {
    let message = '';
    const sockets = new SocketResult();
    const terminal = terminal2;
    terminal.open(elements);
    let currentInput = '';
    terminal.write('Welcome to NetRunner!\r\n');
    let currentPath = '/home/user';
    prompt('',currentPath);
    terminal.onKey(({ key, domEvent }) => {
        const char = key;
        if (domEvent.keyCode === 13) {  // Enter key
            message = currentInput;
            terminal.writeln('');
            sockets.sendMessage(message,currentPath);
            prompt('',currentPath);
            sockets.getMessage((chat) => {
                terminal.write(chat);
                terminal.writeln('');
                prompt('',currentPath)
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
    function prompt(ip, location) {
        if (location === "/root") {
            location = '~';
        }
        terminal.write(`${ip}root@root[${location}]$`);
    }
}

export { Termi };

