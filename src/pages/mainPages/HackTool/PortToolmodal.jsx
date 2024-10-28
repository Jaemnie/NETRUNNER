import React, { useState, useEffect } from 'react';
import styles from './PortHack.module.css';
import layoutFrame from './ToolLayout.module.css';
import JigsawHackingGame from '../MiniGames/JigsawHackingGame'; // porthack
import RandomMazeGame from '../MiniGames/RandomMazeGame';// SSHcrack
import FlipMatrixGame from '../MiniGames/FlipMatrixGame'; // SMTPoverFlow
import WormMazeGame from '../MiniGames/WormMazeGame'; //WebServerWorm

import { SocketResult } from '../../../socket/Gsocket'; // SocketResult 클래스를 불러오기

function PortToolModal({ show, onClose, toolname }) {
    const [showHackingGame, setShowHackingGame] = useState(false); // 해킹 게임 표시 상태
    const [isSelectIp, setIsSelectIp] = useState(false);
    const [currentPort, setCurrentPort] = useState(null); // 현재 해킹 중인 포트
    const [currentIp, setCurrentIp] = useState(null);
    const [ports, setPorts] = useState([]); // 포트 데이터 상태 추가
    const [socket, setSocket] = useState(null); // 소켓 인스턴스 상태 추가

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
            if (storedPorts) {
                console.log("Loading port data from localStorage:", storedPorts); // localStorage에서 데이터 불러오는지 로그 출력
                setPorts(JSON.parse(storedPorts));
            } else {
                console.log("No port data found in localStorage."); // localStorage에 데이터가 없는 경우 로그 출력
                setPorts([]); // 포트 데이터가 없을 경우 빈 배열로 설정
            }
        } else {
            // 모달이 닫힐 때 localStorage 데이터 초기화
            localStorage.removeItem('portData');
            console.log("Port and IP data cleared from localStorage after modal close.");
            setPorts([]); // 포트 데이터 상태 초기화
        }
    }, [show]);
    const handleIpSelectClick = (port) => {
        setCurrentIp(port.ip);
        setIsSelectIp(true);
    };
    const handleHackClick = (port) => {
        console.log(port);
        setCurrentPort(port);
        setShowHackingGame(true); // 해킹 게임 표시
    };

    const closeHackingGame = (success) => {
        setShowHackingGame(false); // 해킹 게임 닫기
        if (success) {
            // 해킹이 성공하면 포트 상태 업데이트
            const updatedPorts = ports.map(port => {
                return {
                    ...port,
                    ports: port.ports.map(p =>
                        p.id === currentPort.id ? { ...p, status: 'open' } : p
                    )
                };
            });
            setPorts(updatedPorts);
            localStorage.setItem('portData', JSON.stringify(updatedPorts)); // 업데이트된 포트 데이터를 localStorage에 저장

            // 해킹 성공 시 소켓을 통해 서버에 메시지 전송
            if (socket && currentIp !== null) { // IP 데이터가 있을 경우에만 메시지 전송
                const message = `${toolname} ${currentIp} ${currentPort.number} open`;
                console.log("Sending message to server:", message); // 메시지 전�� 로그
                socket.sendMessage(message);

                // 서버에 메시지를 전송한 후 localStorage에서 portData 및 ipData 삭제
                localStorage.removeItem('portData');
                console.log("Port and IP data removed from localStorage after successful hack.");
            }
        }
    };

    return (
        show && (
            <div className={layoutFrame.modalOverlay} onClick={onClose}>
                <div className={`${layoutFrame.modalContent} ${layoutFrame.augsTools}`} onClick={(e) => e.stopPropagation()} data-augmented-ui>
                    <div className={styles.portHackContainer}>
                        <h2 className={layoutFrame.modalTitle}>{toolname}</h2>
                        <ul className={styles.portList}>
                            {ports.length === 0 ? (
                                <p>데이터를 받아오지 못했습니다. scan 명령어로 IP를 검색하세요.</p>
                            ) : isSelectIp ? (
                                ports.map(port => (
                                    port.ports.map(p => (
                                        port.ip === currentIp && (
                                            (toolname === 'porthack' && p.number !== '22' && p.number !== '80' && p.number !== '25') ||
                                            (toolname === 'SSHcrack' && p.number === '22') ||
                                            (toolname === 'SMTPoverFlow' && p.number === '25') ||
                                            (toolname === 'WebServerWorm' && p.number === '80')
                                        ) && (
                                            <li key={p.id} className={styles.portItem}>
                                                {p.number} - {p.status.toUpperCase()}
                                                {p.status === 'closed' && (
                                                    <button onClick={() => handleHackClick(p)} className={styles.hackButton}>HACK</button>
                                                )}
                                            </li>
                                        )
                                    ))
                                ))
                            ) : (
                                ports.map(port => (
                                    <li key={port.id} className={styles.portItem}>
                                        {port.ip} <button onClick={() => handleIpSelectClick(port)} className={styles.hackButton}>SELECT</button>
                                    </li>
                                ))
                            )}
                        </ul>
                        {showHackingGame && (
                            <>
                                {toolname === "porthack" && <JigsawHackingGame onClose={(success) => closeHackingGame(success)} />}
                                {toolname === "SSHcrack" && <RandomMazeGame onClose={(success) => closeHackingGame(success)} />}
                                {toolname === "SMTPoverFlow" && <FlipMatrixGame onClose={(success) => closeHackingGame(success)} />}
                                {toolname === "WebServerWorm" && <WormMazeGame onClose={(success) => closeHackingGame(success)} />}
                            </>
                        )}
                    </div>
                    <button className={layoutFrame.closeButton} onClick={onClose}></button>
                </div>
            </div>
        )
    );
}

export default PortToolModal;
