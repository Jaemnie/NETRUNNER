// TermPage.js

import { Terminal } from "@xterm/xterm";
import "../../../node_modules/xterm/css/xterm.css"; // 기존 xterm.css
import "./xterm-custom.css"; // 새로운 xterm-custom.css
import React, { useRef, useEffect, useMemo } from "react";
import { Termi } from "./termsocket";
import TerminalInteraction from './TerminalInteraction';
import { SocketResult } from "../../socket/socket";

const TermPage = () => {
  const termRef = useRef(null);
  const socketRoomId = useMemo(() => Math.floor(100000 + Math.random() * 900000).toString(), []); // 소켓 방 ID를 메모이제이션

  const socket = useMemo(() => {
    const newSocket = new SocketResult();
    newSocket.joinRoom(socketRoomId);
    return newSocket;
  }, [socketRoomId]); // 소켓 객체를 메모이제이션

  useEffect(() => {
    if (termRef.current) {
      const term = new Terminal();
      Termi(term, termRef.current, socket.getRoomId());
      TerminalInteraction.setTerminal(term);
      return () => {
        term.dispose();
      };
    }
  }, [socket]);

  return (
    <div ref={termRef} className="terminal-container" />
  );
}

export default TermPage;
