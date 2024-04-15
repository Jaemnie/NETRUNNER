import { Terminal } from "@xterm/xterm";
import "../../node_modules/@xterm/xterm/css/xterm.css";
import React,{useRef,useEffect,useState} from "react";
import { Termi } from "../pages/mainPages/temp/terminal";
import DirectoryViewer from "./fileSystem";
const TermPage=()=> {
    const terminalRef = useRef(null); // DOM 요소 참조를 위한 ref
    useEffect(() => {
      if(terminalRef.current) {
        const term = new Terminal();
        Termi(term,terminalRef.current);
        return () => {
            term.dispose(); // Terminal 인스턴스 정리
          };
      }
    }, []);
    return (<>
                {/* DirectoryViewer 컴포넌트로 파일 시스템 내용을 렌더링 */}
                <DirectoryViewer initialPath="/initial/path" /> 
                <div ref={terminalRef} style={{width: "100%",height: "100%"}}></div>
</>
    );
}
export default TermPage;