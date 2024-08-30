// PortHackModal.js

import React, { useState, useEffect } from 'react';
import styles from './PortHack.module.css';
import JigsawHackingGame from '../MiniGames/JigsawHackingGame'; // Jigsaw Hacking Game 컴포넌트 불러오기

function PortHackModal({ show, onClose }) {
  const [showHackingGame, setShowHackingGame] = useState(false); // 해킹 게임 표시 상태
  const [currentPort, setCurrentPort] = useState(null); // 현재 해킹 중인 포트
  const [ports, setPorts] = useState([]); // 포트 데이터 상태 추가

  useEffect(() => {
    // 모달이 열릴 때 localStorage에서 포트 데이터를 불러옴
    if (show) {
      const storedPorts = localStorage.getItem('portData');
      if (storedPorts) {
        console.log("Loading port data from localStorage:", storedPorts); // localStorage에서 데이터 불러오는지 로그 출력
        setPorts(JSON.parse(storedPorts));
      } else {
        console.log("No port data found in localStorage."); // localStorage에 데이터가 없는 경우 로그 출력
        setPorts([]); // 포트 데이터가 없을 경우 빈 배열로 설정
      }
    }
  }, [show]);

  const handleHackClick = (port) => {
    setCurrentPort(port);
    setShowHackingGame(true); // 해킹 게임 표시
  };

  const closeHackingGame = (success) => {
    setShowHackingGame(false); // 해킹 게임 닫기
    if (success && currentPort) {
      // 해킹이 성공하면 포트 상태 업데이트
      const updatedPorts = ports.map((p) =>
        p.id === currentPort.id ? { ...p, status: 'open' } : p
      );
      setPorts(updatedPorts);
      localStorage.setItem('portData', JSON.stringify(updatedPorts)); // 업데이트된 포트 데이터를 localStorage에 저장
    }
  };

  return (
    show && (
      <div className={styles.PortHackModal}>
        <div className={styles.PortHackModalContent}>
          {/* 닫기 버튼 추가 */}
          <button className={styles.PortHackCloseButton} onClick={onClose}>X</button>
          <h2>IP Scan</h2>
          <ul>
            {ports.length === 0 ? (
              <p>데이터를 받아오지 못했습니다. scan 명령어로 IP를 검색하세요.</p> // 포트 데이터가 없을 때 예외 메시지 표시
            ) : (
              ports.map(port => (
                <li key={port.id}>
                  {port.number} - {port.status.toUpperCase()} {/* 상태를 대문자로 표시 */}
                  {port.status === 'closed' && (
                    <button onClick={() => handleHackClick(port)} className={styles.PortHackButton}>HACK</button>
                  )}
                </li>
              ))
            )}
          </ul>
          {showHackingGame && <JigsawHackingGame onClose={(success) => closeHackingGame(success)} />} {/* 성공 여부를 콜백으로 전달 */}
        </div>
      </div>
    )
  );
}

export default PortHackModal;
