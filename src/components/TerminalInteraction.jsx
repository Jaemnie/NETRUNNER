let terminal = null;
let directoryViewer = null;

export const TerminalInteraction = {
  //터미널 객체 설정
  setTerminal: (term) => {
    terminal = term;
  },

  //gui페이지 설정
  setDirectoryViewer: (viewer) => {
    directoryViewer = viewer;
  },

  //터미널->GUI
  handleTerminalInput: (data) => {
    // 터미널 창에서 입력된 명령어를 DirectoryViewer에 전달
      directoryViewer.updateDirectoryContent(data);
  },

  //GUI->터미널
  appendToTerminal: (text) => {
    // DirectoryViewer에서 전달받은 텍스트를 터미널 창에 입력
    terminal.write(text);
    terminal.write('\r\n');
  }
  
};
