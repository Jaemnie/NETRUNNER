import TerminalInteraction from './TerminalInteraction';
import { SocketResult } from '../../socket/socket';

function Termi(terminal2, elements, socketRoomId, setPorts) {
  let message = '';
  const socket = new SocketResult('TERM');
  socket.joinRoom(socketRoomId);
  const terminal = terminal2;
  terminal.open(elements);
  let currentInput = '';  // 명령어 입력 상태를 추적하는 변수
  let lastCommand = '';  // 마지막 명령어를 추적하는 변수
  let commandHistory = [];
  let historyIndex = -1;
  const userId = localStorage.getItem('userId');
  const prompt = `\x1b[31mroot@${userId}\x1b[0m:~$ `;

  // 터미널 초기 메시지 출력
  terminal.write('넷러너에 오신걸 환영합니다!\r\n');
  terminal.write(prompt);

  // 소켓 메시지를 수신할 때마다 처리하는 로직
  const handleSocketMessage = (data) => {
    console.log("Received data from socket:", data); // 수신된 데이터 로그

    terminal.write(data); // 소켓에서 받은 데이터를 터미널에 출력
    terminal.writeln('');
    terminal.write(prompt);
    TerminalInteraction.handleTerminalInput(data);

    // 'scan' 명령어에 대한 응답을 처리하여 포트 데이터를 업데이트
    if (lastCommand.includes('scan')) {  // 'scan' 문자열이 포함되어 있는지 확인
      try {
        console.log("Processing scan data..."); // scan 데이터 처리 로그
        const { nodePortIp } = parsePortData(data);  // IP와 포트 데이터를 파싱
        console.log("Parsed IP and port data:", nodePortIp); // 파싱된 IP와 포트 데이터 로그

        if (nodePortIp.length > 0) {  // IP와 포트 데이터가 모두 있을 경우에만 저장
          localStorage.setItem('portData', JSON.stringify(nodePortIp)); // IP 데이터를 localStorage에 저장
          // console.log("Port data saved to localStorage:", localStorage.getItem('portData')); // 포트 데이터 저장 로그
          setPorts(nodePortIp);  // 포트 데이터를 상태로 업데이트
        } else {
          console.log("No valid port data found or IP missing.");
        }
      } catch (error) {
        console.error('Error parsing port data:', error);
        setPorts([]); // 파싱에 실패할 경우 빈 배열로 설정하여 예외 처리
        localStorage.removeItem('portData'); // 오류 발생 시 포트 데이터 제거
      }
    } else {
      console.log("Current input is not 'scan':", lastCommand);
    }
  };

  // 터미널 입력 이벤트 처리
  terminal.onKey(({ key, domEvent }) => {
    const char = key;
    if (domEvent.keyCode === 13) { // Enter key
      message = currentInput;
      console.log("Enter pressed, current input:", message); // Enter 키가 눌렸을 때 현재 입력된 메시지 로그
      if (message.trim() === 'clear') {
        terminal.write('\r\n');
        terminal.clear();
        terminal.write(prompt);
        currentInput = '';
        historyIndex = commandHistory.length;
      } else {
        terminal.writeln('');
        commandHistory.push(currentInput);
        historyIndex = commandHistory.length;
        console.log("Sending message to socket:", message); // 전송할 메시지 로그
        socket.sendMessage(message); // 소켓을 통해 메시지 전송
        TerminalInteraction.handleTerminalInput(message);
        lastCommand = currentInput; // 마지막 명령어 저장
        currentInput = ''; // 명령어 초기화
      }
    } else if (domEvent.keyCode === 8) { // Backspace
      if (currentInput.length > 0) {
        terminal.write('\b \b');
        currentInput = currentInput.slice(0, -1);
      }
    } else if (domEvent.keyCode === 38) { // Up arrow key
      if (historyIndex > 0) {
        historyIndex--;
        currentInput = commandHistory[historyIndex];
        terminal.write('\r\x1b[K' + currentInput);
      }
    } else if (domEvent.keyCode === 40) { // Down arrow key
      if (historyIndex < commandHistory.length - 1) {
        historyIndex++;
        currentInput = commandHistory[historyIndex];
        terminal.write('\r\x1b[K' + currentInput);
      } else {
        historyIndex = commandHistory.length;
        currentInput = '';
        terminal.write('\r\x1b[K');
      }
    } else if (domEvent.ctrlKey && domEvent.keyCode === 76) { // Ctrl+L to clear the terminal
      terminal.clear();
      terminal.write(prompt);
      currentInput = '';
    } else {
      currentInput += char;
      terminal.write(char);
    }
  });

  // 소켓에서 메시지를 수신할 때마다 handleSocketMessage 함수 호출
  socket.getMessage(handleSocketMessage);
}

// 포트 데이터를 파싱하는 함수 (텍스트 형태로 가정)
function parsePortData(data) {
  const nodePortIp = [];
  const lines = data.trim().split(/^username\s*{?\s*node\d{2}\s*}?/gm);

  for (const line of lines) {
    if (line !== '') {
      const ports = [];
      let ip = "";
      const trimmedLine = line.trim().split('\n');

      for (const tline of trimmedLine) {
        // IP 주소 찾기
        if (tline.startsWith('IP{')) {
          const ipMatch = tline.match(/\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b/);
          if (ipMatch) {
            ip = ipMatch[0];
          }
        }
        // 특정 포트 정보를 가진 라인을 찾습니다. 예: "Port[ {22 : OPEN} "
        const portInfo = tline.match(/\{(\d+)\s*:\s*(OPEN|CLOSED)\}/i);
        if (portInfo) {
          const number = portInfo[1];
          const status = portInfo[2].toLowerCase();
          ports.push({ id: ports.length + 1, number, status });
        }
      }
      nodePortIp.push({ id: nodePortIp.length + 1, ip: ip, ports: ports });
    }

  }
  console.log("Parsed IP and ports array:", nodePortIp); // 파싱된 IP와 포트 데이터 확인
  return { nodePortIp };
}


export { Termi };
