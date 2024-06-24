import React, { useRef, useEffect, useState } from 'react';
import "../../node_modules/@xterm/xterm/css/xterm.css";
import { DirectoryViewer } from './fileSystem';
import  TerminalInteraction  from './TerminalInteraction';
import TermPage from './termPage';

const MainPageComp = () => {
  const dirViewerRef = useRef(null);
  TerminalInteraction.setDirectoryViewer(dirViewerRef);
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
          <DirectoryViewer ref={dirViewerRef}/>
      </div>
      <TermPage style={terminalStyle}/>
    </div>
  );
};

export default MainPageComp;
