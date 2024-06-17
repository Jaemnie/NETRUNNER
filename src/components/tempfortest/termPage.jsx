import { Terminal } from "@xterm/xterm";
import "../../node_modules/@xterm/xterm/css/xterm.css";
import React, { useRef, useEffect, useState } from "react";
// import { Termi } from "../pages/mainPages/temp/terminal";
import { Termi } from "./termsocket";
import DirectoryViewer from "./fileSystem";
const TermPage = () => {
  const terminalRef = useRef(); // DOM 요소 참조를 위한 ref
  useEffect(() => {
    if (terminalRef.current) {
      // let message = '';
      // let currentInput = '';
      const term = new Terminal();
      Termi(term,terminalRef.current);
      // term.open(terminalRef.current);
      // term.onKey(({ key, domEvent }) => {
      //   const char = key;
      //   if (domEvent.keyCode === 13) {  // Enter key
      //     term.writeln('');
      //     sockets.getMessage((chat) => {
      //       term.write(chat);
      //       term.writeln('');
      //       prompt('', currentPath)
      //       chat = '';
      //     });
      //     currentInput = '';
      //   } else if (domEvent.keyCode === 8) {
      //     // Backspace 처리
      //     if (currentInput.length > 0) {
      //       term.write('\b \b'); // 터미널에서 문자를 제거
      //       currentInput = currentInput.slice(0, -1);
      //     }
      //   } else {
      //     currentInput += char;
      //     term.write(char);
      //   }
      // });
      return () => {
        term.dispose(); // Terminal 인스턴스 정리
      };
    }
  }, []);
  return (<>
    {/* DirectoryViewer 컴포넌트로 파일 시스템 내용을 렌더링 */}
    <DirectoryViewer initialPath="/home/user" />
    <div ref={terminalRef} style={{ width: "100%", height: "100%" }}></div>
  </>
  );
}
export default TermPage;