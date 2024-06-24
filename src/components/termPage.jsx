import { Terminal } from "@xterm/xterm";
import "../../node_modules/@xterm/xterm/css/xterm.css";
import React, { useRef, useEffect, useState } from "react";
import { Termi } from "./termsocket";
import  TerminalInteraction  from './TerminalInteraction';
import {SocketResult} from "./socket";

const TermPage = () => {
  const termRef = useRef(null);
  const socketRoomId = Math.floor(100000 + Math.random() * 900000).toString();
  const socket = new SocketResult();
  socket.joinRoom(socketRoomId);
  useEffect(() => {
    if (termRef.current) {
      const term = new Terminal();
      Termi(term, termRef.current,socket.getRoomId()); 
      TerminalInteraction.setTerminal(term);
      return () => {
        term.dispose(); // Terminal 인스턴스 정리
      };
    }
  },[]);
  return (<>
    {/* DirectoryViewer 컴포넌트로 파일 시스템 내용을 렌더링 */}
    <div ref={termRef} />
  </>
  );
}
export default TermPage;