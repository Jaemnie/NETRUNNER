import { Terminal } from "@xterm/xterm";
import "../../node_modules/@xterm/xterm/css/xterm.css";
import React,{useRef,useEffect} from "react";
import { Termi } from "../pages/mainPages/tlqkf/terminal";
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
                <div>filesystem</div>
                <div ref={terminalRef} style={{width: "100%",height: "100%"}}></div>
</>
    );
}
export default TermPage;