import { Terminal } from "@xterm/xterm";
import "../../node_modules/@xterm/xterm/css/xterm.css";
import React, { useRef, useEffect } from "react"; // useState 제거
import { Termi } from "./termsocket";
import TerminalInteraction from './TerminalInteraction';
import { SocketResult } from "./socket";
import './terminal.css'; // 커스텀 CSS 가져오기

const TermPage = () => {
  const termRef = useRef(null);
  const socketRoomId = Math.floor(100000 + Math.random() * 900000).toString();
  const socket = new SocketResult();
  socket.joinRoom(socketRoomId);

  useEffect(() => {
    if (termRef.current) {
      const term = new Terminal();
      Termi(term, termRef.current, socket.getRoomId());
      TerminalInteraction.setTerminal(term);
      return () => {
        term.dispose(); // 터미널 인스턴스 정리
      };
    }
  }, [socket]); // socket 의존성 추가

  return (
    <>
      <div ref={termRef} className="terminal-container" /> {/* 커스텀 CSS 클래스 적용 */}
    </>
  );
}

export default TermPage;
