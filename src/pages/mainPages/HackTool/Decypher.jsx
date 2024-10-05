import React, { useState, useEffect } from 'react';
import styles from './PortHack.module.css';
import layoutFrame from './ToolLayout.module.css';
import Game from '../MiniGames/metrixpuzzle';
import { SocketResult } from '../../../socket/Gsocket'; // SocketResult 클래스를 불러오기

function DecypherModal({ show, onClose }) {
    const [showHackingGame, setShowHackingGame] = useState(false); // 해킹 게임 표시 상태
    const [currentFile, setCurrentFile] = useState(null); // 현재 해킹 중인 포트
    const [filename, setFilename] = useState([]); // 포트 데이터 상태 추가
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

        } else {
            setFilename([]);
        }
    }, [show]);

    const handleHackClick = (file) => {
        setCurrentFile(file);
        setShowHackingGame(true); // 해킹 게임 표시
    };

    const closeHackingGame = (success) => {
        setShowHackingGame(false); // 해킹 게임 닫기
        if (success) {

            // 해킹 성공 시 소켓을 통해 서버에 메시지 전송
            if (filename) { // IP 데이터가 있을 경우에만 메시지 전송
                const message = `Decypher ${filename}`;
                console.log("Sending message to server:", message); // 메시지 전�� 로그
                socket.sendMessage(message);

                // 서버에 메시지를 전송한 후 localStorage에서 portData 및 ipData 삭제
            }
        }
    };

    return (
        show && (
            <div className={layoutFrame.modalOverlay} onClick={onClose}>
                <div className={`${layoutFrame.modalContent} ${layoutFrame.augsTools}`} onClick={(e) => e.stopPropagation()} data-augmented-ui>
                    <div className={styles.portHackContainer}>
                        <h2 className={layoutFrame.modalTitle}>Decypher</h2>
                        <Game></Game>
                    </div>
                    <button className={layoutFrame.closeButton} onClick={onClose}></button>
                </div>
            </div>
        )
    );
}

export default DecypherModal;
