// TerminalInteraction.js

class TerminalInteraction {
  static terminal = null; // 터미널 객체를 저장하는 정적 변수
  static directoryViewer = null; // 디렉토리 뷰어 객체를 저장하는 정적 변수

  static setTerminal(term) {
    TerminalInteraction.terminal = term; // 터미널 객체 설정
  }

  static setDirectoryViewer(viewer) {
    TerminalInteraction.directoryViewer = viewer; // 디렉토리 뷰어 객체 설정
  }

  static handleTerminalInput(data) {
    // 'cat' 명령어를 실행할 때는 경로 업데이트를 하지 않음
    if (!data.trim().startsWith('cat')) {
      TerminalInteraction.directoryViewer.updateDirectoryContent(data); // 터미널 입력 처리 시 디렉토리 내용 업데이트
    }
  }

  static appendToTerminal(text) {
    const userId = localStorage.getItem('userId'); // 로컬 저장소에서 userId 가져오기
    const prompt = `\x1b[31mroot@${userId}\x1b[0m:~$ `; // 프롬프트 설정 (빨간색 ANSI escape code 사용)
    TerminalInteraction.terminal.write('\r\n'); // 줄바꿈 추가
    TerminalInteraction.terminal.write(prompt);
    TerminalInteraction.terminal.write(text); // 터미널에 텍스트 작성
    TerminalInteraction.terminal.write('\r\n'); // 줄바꿈 추가
    TerminalInteraction.terminal.write(prompt);
  }
}

export default TerminalInteraction;
