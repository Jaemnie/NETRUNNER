import React, { useState, useEffect } from 'react';
import styles from './PortHack.module.css';
import layoutFrame from './ToolLayout.module.css';
import FlipMatrixGame from '../MiniGames/FlipMatrixGame'; // FlipMatrixGame 임포트
import { SocketResult } from '../../../socket/Gsocket'; // SocketResult 클래스 임포트

function SMTPoverflow({ show, onClose }) {
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

    // 미니게임 종료 시 호출되는 함수
    const closeHackingGame = (success) => {
        console.log(`게임 성공: ${success}`);
        onClose(); // 모달 닫기

        if (success) {
            const message = `SMTPoverflow 활성화`;
            console.log("Sending message to server:", message); // 메시지 전송 로그
            socket.sendMessage(message);
            socket.getMessage((data) => {
                console.log("Received message from server:", data);
            });
        }
    };

    return (
        show && (
            <div className={layoutFrame.modalOverlay} onClick={onClose}>
                <div
                    className={`${layoutFrame.modalContent} ${layoutFrame.augsTools}`}
                    onClick={(e) => e.stopPropagation()}
                    data-augmented-ui
                >
                    <div className={styles.portHackContainer}>
                        <FlipMatrixGame onClose={closeHackingGame} />
                    </div>
                    <button className={layoutFrame.closeButton} onClick={onClose}></button>
                </div>
            </div>
        )
    );
}

export default SMTPoverflow;
