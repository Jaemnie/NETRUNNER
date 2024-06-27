import React, { useRef } from 'react';
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import { DirectoryViewer } from '../Directory/DirectoryViewer';
import TerminalInteraction from '../Terminal/TerminalInteraction';
import TermPage from '../Terminal/termPage';
import styles from './MainPageComp.module.css'; // CSS 모듈을 가져옴

// MainPageComp 컴포넌트 정의
const MainPageComp = () => {
  const dirViewerRef = useRef(null); // DirectoryViewer를 참조하기 위한 useRef 설정
  TerminalInteraction.setDirectoryViewer(dirViewerRef); // TerminalInteraction에 DirectoryViewer 설정

  return (
    <div className={styles.mainPageComp}>
      {/* DirectoryViewer 컴포넌트 */}
      <div className={styles.directoryViewerContainer}>
        <DirectoryViewer ref={dirViewerRef} />
      </div>
      {/* TermPage 컴포넌트 */}
      <TermPage className={styles.terminalContainer} />
    </div>
  );
};

export default MainPageComp;
