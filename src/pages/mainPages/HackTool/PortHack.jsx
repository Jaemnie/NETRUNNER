import React, { useState } from 'react';
import styles from './PortHack.module.css';
import JigsawHackingGame from '../MiniGames/JigsawHackingGame'; // Jigsaw Hacking Game 컴포넌트 불러오기

function PortHackModal({ show, onClose, onHack, ports, setPorts }) {
  const [ipAddress, setIpAddress] = useState('');
  const [showHackingGame, setShowHackingGame] = useState(false); // 해킹 게임 표시 상태

  const handleScan = async () => {
    // 백엔드 코드 주석 처리, 테스트용 데이터 사용
    setPorts([
      { id: 1, number: '22', status: 'open' },
      { id: 2, number: '80', status: 'closed' },
      { id: 3, number: '443', status: 'open' }
    ]);
  };

  const handleHackClick = () => {
    setShowHackingGame(true); // 해킹 게임 표시
  };

  const closeHackingGame = () => {
    setShowHackingGame(false); // 해킹 게임 닫기
  };

  return (
    show && (
      <div className={styles.PortHackModal}>
        <div className={styles.PortHackModalContent}>
          <button className={styles.PortHackCloseButton} onClick={onClose}>X</button>
          <h2>IP Scan</h2>
          <input
            type="text"
            value={ipAddress}
            onChange={(e) => setIpAddress(e.target.value)}
            placeholder="Enter IP address"
            className={styles.PortHackInput}
          />
          <button onClick={handleScan} className={styles.PortHackButton}>Scan</button>
          <ul>
            {ports.map(port => (
              <li key={port.id}>
                {port.number} - {port.status}
                {port.status === 'closed' && (
                  <button onClick={handleHackClick} className={styles.PortHackButton}>HACK</button>
                )}
              </li>
            ))}
          </ul>
          {showHackingGame && <JigsawHackingGame onClose={closeHackingGame} />}
        </div>
      </div>
    )
  );
}

export default PortHackModal;
