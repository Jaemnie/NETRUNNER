import React, { useRef, useEffect, useState } from 'react';
import "../../../node_modules/@xterm/xterm/css/xterm.css";
import { DirectoryViewer } from '../Directory/DirectoryViewer';
import TerminalInteraction from '../Terminal/TerminalInteraction';
import TermPage from '../Terminal/termPage';
import styles from './MainPageComp.module.css'; // CSS 모듈을 가져옴
import ModalStyles from './modals/modal.module.css';
import Modal from './modals/Modal';
import Tutorial from '../Tutorial/tutorialPage';
import NodeMap from '../NodeMap/NodeMap';

// MainPageComp 컴포넌트 정의
const MainPageComp = () => {
  const dirViewerRef = useRef(null); // DirectoryViewer를 참조하기 위한 useRef 설정
  const miniMap = useRef(null);
  const missionId = localStorage.getItem('missionId');
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    localStorage.setItem("tutorial", "false");
    setIsModalOpen(false);
  };

  useEffect(() => {
    // DirectoryViewer 설정
    TerminalInteraction.setDirectoryViewer(dirViewerRef.current);
    TerminalInteraction.setNodeMap(miniMap.current);

    if ((missionId === '0' || missionId === 0) && !localStorage.getItem("tutorial")) {
      localStorage.setItem("tutorial", "true");
      setIsModalOpen(true);
    } else {
      localStorage.setItem("tutorial", "false");
    }

  }, [missionId]);
  return (
    <div className={styles.mainPageComp}>
      {
        < Modal isOpen={isModalOpen} closeModal={closeModal}>
          <button className={`${ModalStyles.close}`} onClick={closeModal} />
          <Tutorial />
        </Modal>
      }

      {/* DirectoryViewer 컴포넌트 */}
      <div className={styles.directoryViewerContainer}>
        <DirectoryViewer ref={dirViewerRef} />

      </div>
      <div className={styles.testview}>
        <NodeMap ref={miniMap} />
      </div>
      {/* TermPage 컴포넌트 */}
      <TermPage className={styles.terminalContainer} />
    </div >
  );
};

export default MainPageComp;
