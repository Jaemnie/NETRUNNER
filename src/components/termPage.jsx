import React, { useRef, useEffect } from 'react';
import { Terminal } from '@xterm/xterm';
import "../../node_modules/@xterm/xterm/css/xterm.css";
import { DirectoryViewer } from './fileSystem';
import { TerminalInteraction } from './TerminalInteraction';
import { Termi } from './termsocket';

const TermPage = () => {
  const termRef = useRef(null);
  const dirViewerRef = useRef(null);

  useEffect(() => {
    if (termRef.current) {
      const term = new Terminal();
      Termi(term, termRef.current); 
      TerminalInteraction.setTerminal(term);
      TerminalInteraction.setDirectoryViewer(dirViewerRef.current);
      return () => {
        term.dispose(); // Terminal 인스턴스 정리
      };
    }
  }, []);

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100vh',
  };

  const directoryViewerStyle = {
    flexShrink: 0,
    border: '2px solid #C471ED',
    borderRadius: '8px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  const terminalStyle = {
    flexGrow: 1,
    border: '2px solid #C471ED',
    borderRadius: '8px',
    padding: '10px',
    boxSizing: 'border-box',
  };

  return (
    <div style={containerStyle}>
      <div style={directoryViewerStyle}>
        <DirectoryViewer ref={dirViewerRef} />
      </div>
      <div ref={termRef} style={terminalStyle} />
    </div>
  );
};

export default TermPage;
