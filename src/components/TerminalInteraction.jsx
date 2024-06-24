class TerminalInteraction {
  static terminal = null;
  static directoryViewer = null;

  static setTerminal(term) {
    TerminalInteraction.terminal = term;
  }

  static setDirectoryViewer(viewer) {
    TerminalInteraction.directoryViewer = viewer;
    
  }

  static handleTerminalInput(data) {
    TerminalInteraction.directoryViewer.updateDirectoryContent(data);

  }

  static appendToTerminal(text) {
    TerminalInteraction.terminal.write(text);
    TerminalInteraction.terminal.write('\r\n');
  }
}

export default TerminalInteraction;
