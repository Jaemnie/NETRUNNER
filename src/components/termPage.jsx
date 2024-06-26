import { Terminal } from "@xterm/xterm";
import "../../node_modules/@xterm/xterm/css/xterm.css";
import React, { useRef, useEffect } from "react";
import { Termi } from "./termsocket";
import TerminalInteraction from './TerminalInteraction';
import { SocketResult } from "./socket";

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
        term.dispose();
      };
    }
  }, [socket]);

  return (
    <>
      <div ref={termRef} className="terminal-container" />
    </>
  );
}

export default TermPage;
