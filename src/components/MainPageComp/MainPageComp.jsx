import React, { useRef, useEffect, useState } from 'react';
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import { DirectoryViewer } from '../Directory/DirectoryViewer';
import TerminalInteraction from '../Terminal/TerminalInteraction';
import TermPage from '../Terminal/termPage';
import styles from './MainPageComp.module.css'; // CSS 모듈을 가져옴
import Modal from './modals/Modal';
import Tutorial from '../Tutorial/tutorialPage';

// MainPageComp 컴포넌트 정의
const MainPageComp = () => {
  const dirViewerRef = useRef(null); // DirectoryViewer를 참조하기 위한 useRef 설정
  const missionId = localStorage.getItem('missionId');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    // DirectoryViewer 설정
    TerminalInteraction.setDirectoryViewer(dirViewerRef.current);
    if (missionId === '0' || missionId === 0) {
      console.log("미션아이디 타입", typeof missionId);
      setIsModalOpen(true);
    }
  }, [missionId]);

  return (
    <div className={styles.mainPageComp}>
      <Modal isOpen={isModalOpen} closeModal={closeModal}>
        <span className="close" onClick={closeModal}>
          &times;
        </span>
        <Tutorial></Tutorial>
      </Modal>
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
