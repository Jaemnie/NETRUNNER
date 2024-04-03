import { FileSystem } from "./fileSystems.js";
// const terminal = new Terminal();
// document.addEventListener('DOMContentLoaded', termi(terminal));
function termi(terminal2) {
    const terminal = terminal2;
    terminal.open(document.getElementById('term'));
    let currentInput = '';
    terminal.write('Welcome to NetRunner!\r\n');
    let currentPath = '/home/user';
    prompt(currentPath);
    terminal.onKey(({ key, domEvent }) => {
        const char = key;
        if (domEvent.keyCode === 13) {  // Enter key
            terminal.writeln('');
            const command = currentInput.trim().split(" ");
            switch (command[0]) {
                case 'pwd':
                    terminal.write(fs.getPathInfo(currentPath).absolutePath + '\r\n');
                    break;
                case 'cd':
                    console.log(command[1]);
                    if (command[1] === undefined) {
                        currentPath = "/root";
                    } else if (command[1] == '..') {
                        if (currentPath == '/') {
                            currentPath = '/';
                        } else {
                            let lastPath = currentPath.lastIndexOf("/");
                            let temp = currentPath.substring(0, lastPath);
                            currentPath = temp;
                        }
                    } else if (fs.isOverlap(command[1], currentPath) == false) {
                        currentPath += ("/" + command[1]);
                    } else if (fs.findDirectory(command[1]) == true) {
                        currentPath = command[1];
                    } else {
                        terminal.write("No such path found\r\n");
                    }
                    break;
                case 'cat':
                    break;
                case 'ls':
                    for (const key in fs.getPathInfo(currentPath).files) {
                        terminal.write(fs.getPathInfo(currentPath).files[key]);
                        if (command[1] == "-al") {
                            terminal.write("[" + fs.getPathInfo(currentPath).filestype[key] + "]");
                        }
                        terminal.write(" ");
                    }
                    terminal.write("\r\n");
                    break;
                case 'help':
                    terminal.write('Commands:\r\nls - List files\r\nhelp - Show this help message\r\n');
                    break;
                case 'cp':
                    break;
                case 'mv':
                    break;
                case 'rm':
                    let temp5 = currentPath;
                    if (command[1] == "*") {
                        fs.deleteDirectory(currentPath);
                        fs.createDirectory(currentPath);
                    }
                    if (fs.isOverlap(command[1], currentPath) == false) {
                        for (const key in fs.getPathInfo(currentPath).files) {
                            if (fs.getPathInfo(currentPath).files[key] == command[1]) {
                                if (fs.getPathInfo(currentPath).filestype[key] == "file") {
                                    fs.deleteFile(temp5 += ("/" + command[1]));
                                } else {
                                    fs.deleteDirectory(temp5 += ("/" + command[1]));
                                }
                            }
                        }
                    }
                    break;
                case 'clear':
                    terminal.clear();
                    break;
                case 'mkdir':
                    let temp2 = currentPath;
                    temp2 += ("/" + command[1]);
                    fs.createDirectory(temp2);
                    break;
                case 'rmdir':
                    let temp3 = currentPath;
                    temp3 += ("/" + command[1]);
                    fs.deleteDirectory(temp3);
                    break;
                case 'touch':
                    let temp4 = currentPath;
                    temp4 += ("/" + command[1]);
                    fs.createFile(temp4);
                    break;
                case 'vi':
                    break;


                case 'ps':
                    break;
                case 'kill':
                    break;
                case 'nmap':
                    break;
                case 'porthack':
                    break;
                case 'scp':
                    break;
                case 'sshcrack':
                    break;
                case 'scan':
                    break;
                case 'connect':
                    break;
                case 'disconnect':
                    break;


                default:
                    terminal.write('Unknown command\r\n');
                    break;
            }
            currentInput = '';
            prompt(currentPath);
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
        if (location == "/root") {
            location = '~';
        }
        terminal.write(`${ip}root@root[${location}]$`);
    }
}

export { termi };

