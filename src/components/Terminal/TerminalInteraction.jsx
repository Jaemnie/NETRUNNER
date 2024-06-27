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
    TerminalInteraction.directoryViewer.updateDirectoryContent(data); // 터미널 입력 처리 시 디렉토리 내용 업데이트
  }

  static appendToTerminal(text) {
    TerminalInteraction.terminal.write(text); // 터미널에 텍스트 작성
    TerminalInteraction.terminal.write('\r\n'); // 줄바꿈 추가
  }
}

export default TerminalInteraction;
