import React, { useState, useEffect } from 'react';
import styles from './PortHack.module.css';
import JigsawHackingGame from '../MiniGames/JigsawHackingGame'; // Jigsaw Hacking Game 컴포넌트 불러오기
import { SocketResult } from '../../../socket/Gsocket'; // SocketResult 클래스를 불러오기

function PortHackModal({ show, onClose }) {
  const [showHackingGame, setShowHackingGame] = useState(false); // 해킹 게임 표시 상태
  const [currentPort, setCurrentPort] = useState(null); // 현재 해킹 중인 포트
  const [ports, setPorts] = useState([]); // 포트 데이터 상태 추가
  const [socket, setSocket] = useState(null); // 소켓 인스턴스 상태 추가
  const [ip, setIp] = useState(null); // IP 데이터 상태 추가

  useEffect(() => {
    // 소켓 초기화 및 연결
    const socketInstance = new SocketResult();
    setSocket(socketInstance);

    return () => {
      // 컴포넌트가 언마운트될 때 소켓 연결 해제
      socketInstance.leaveRoom();
    };
  }, []);

  useEffect(() => {
    // 모달이 열릴 때 localStorage에서 포트 및 IP 데이터를 불러옴
    if (show) {
      const storedPorts = localStorage.getItem('portData');
      const storedIp = localStorage.getItem('ipData');
      if (storedPorts) {
        console.log("Loading port data from localStorage:", storedPorts); // localStorage에서 데이터 불러오는지 로그 출력
        setPorts(JSON.parse(storedPorts));
      } else {
        console.log("No port data found in localStorage."); // localStorage에 데이터가 없는 경우 로그 출력
        setPorts([]); // 포트 데이터가 없을 경우 빈 배열로 설정
      }
      if (storedIp) {
        console.log("Loading IP data from localStorage:", storedIp); // localStorage에서 IP 불러오는지 로그 출력
        setIp(storedIp); // IP 데이터 설정
      } else {
        console.log("No IP data found in localStorage."); // localStorage에 IP 데이터가 없는 경우 로그 출력
        setIp(null); // IP 데이터가 없을 경우 null로 설정
      }
    } else {
      // 모달이 닫힐 때 localStorage 데이터 초기화
      localStorage.removeItem('portData');
      localStorage.removeItem('ipData');
      console.log("Port and IP data cleared from localStorage after modal close.");
      setPorts([]); // 포트 데이터 상태 초기화
      setIp(null); // IP 데이터 상태 초기화
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

      // 해킹 성공 시 소켓을 통해 서버에 메시지 전송
      if (socket && ip) { // IP 데이터가 있을 경우에만 메시지 전송
        const message = `porthack ${ip} ${currentPort.number} open`;
        console.log("Sending message to server:", message); // 메시지 전�� 로그
        socket.sendMessage(message);

        // 서버에 메시지를 전송한 후 localStorage에서 portData 및 ipData 삭제
        localStorage.removeItem('portData');
        localStorage.removeItem('ipData');
        console.log("Port and IP data removed from localStorage after successful hack.");
      }
    }
  };

  return (
    show && (
      <div className={styles.modalOverlay} onClick={onClose}>
        <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
          <div className={styles.portHackContainer}>
            <h2 className={styles.modalTitle}>IP Scan</h2>
            <ul className={styles.portList}>
              {ports.length === 0 ? (
                <p>데이터를 받아오지 못했습니다. scan 명령어로 IP를 검색하세요.</p> // 포트 데이터가 없을 때 예외 메시지 표시
              ) : (
                ports.map(port => (
                  <li key={port.id} className={styles.portItem}>
                    {port.number} - {port.status.toUpperCase()} {/* 상태를 대문자로 표시 */}
                    {port.status === 'closed' && (
                      <button onClick={() => handleHackClick(port)} className={styles.hackButton}>HACK</button>
                    )}
                  </li>
                ))
              )}
            </ul>
            {showHackingGame && <JigsawHackingGame onClose={(success) => closeHackingGame(success)} />} {/* 성공 여부를 콜백으로 전달 */}
          </div>
          <button className={styles.closeButton} onClick={onClose}>X</button>
        </div>
      </div>
    )
  );
}

export default PortHackModal;
