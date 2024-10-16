import React, { useState, useEffect } from 'react';
import styles from './PortHack.module.css';
import layoutFrame from './ToolLayout.module.css';
import RotatePuzzleGame from '../MiniGames/RotatePuzzle'; //DECHead
import MetrixPuzzleGame from '../MiniGames/metrixpuzzle'; //Decypher
import { SocketResult } from '../../../socket/Gsocket'; // SocketResult 클래스를 불러오기

function DecypeToolModal({ show, onClose, toolname }) {
    const [showHackingGame, setShowHackingGame] = useState(false); // 해킹 게임 표시 상태
    const [currentFile, setCurrentFile] = useState(null); // 현재 해킹 중인 포트
    const [socket, setSocket] = useState(null); // 소켓 인스턴스 상태 추가
    const [files, setFiles] = useState([]); // 포트 데이터 상태 추가

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
        if (show) {
            const storedFiles = localStorage.getItem('files');
            if (storedFiles) {
                const encodeFile = JSON.parse(storedFiles)
                    .map(file => file.replace(/\[file\]/g, '').trim()) // '[file]' 제거
                    .filter(file => file.includes('.encoded')); // '.encoded' 포함하는 요소만 필터링
                setFiles(encodeFile); // 필터링된 결과를 setFiles에 설정
            } else {
                setFiles([]); // 포트 데이터가 없을 경우 빈 배열로 설정
            }
        } else {
            // 모달이 닫힐 때 localStorage 데이터 초기화
            localStorage.removeItem('files');
        }
    }, [show]);

    const handleHackClick = (file) => {
        setCurrentFile(file);
        setShowHackingGame(true); // 해킹 게임 표시
    };

    const closeHackingGame = (success) => {
        console.log(success);
        setShowHackingGame(false); // 해킹 게임 닫기
        if (success && currentFile) {
            if (currentFile) { // IP 데이터가 있을 경우에만 메시지 전송
                const message = `${toolname} ${currentFile}`;
                console.log("Sending message to server:", message); // 메시지 전�� 로그
                socket.sendMessage(message);
                console.log("확인 용 : ", socket.getMessage());
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
                            {files.length === 0 ? (
                                <p>현재 경로에는 암호화된 파일이 없습니다.</p>
                            ) : (
                                files.map(file => (
                                    file.includes('encoded') && (
                                        <li className={styles.portItem}>
                                            <p>{file}</p>
                                            <button onClick={() => handleHackClick(file)} className={styles.hackButton}>HACK</button>
                                        </li>
                                    )
                                ))
                            )}
                        </ul>
                        {showHackingGame && (
                            <>
                                {toolname === "DECHead" && <RotatePuzzleGame onClose={(success) => closeHackingGame(success)} />}
                                {toolname === "Decypher" && <MetrixPuzzleGame onClose={(success) => closeHackingGame(success)} />}
                            </>
                        )}

                    </div>
                    <button className={layoutFrame.closeButton} onClick={onClose}></button>
                </div>
            </div>
        )
    );
}

export default DecypeToolModal;
