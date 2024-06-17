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
      Termi(term,termRef.current); 
      TerminalInteraction.setTerminal(term);
      TerminalInteraction.setDirectoryViewer(dirViewerRef.current);
      return () => {
        term.dispose(); // Terminal 인스턴스 정리
      };
    }
    
  }, []);

  return (
    <div>
      <DirectoryViewer ref={dirViewerRef} />
      <div ref={termRef} style={{ width: "100%", height: "100%" }} />
    </div>
  );
};

export default TermPage;
