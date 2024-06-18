import React, { forwardRef, useImperativeHandle, useState, useEffect } from 'react';
import { TerminalInteraction } from './TerminalInteraction';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFolder, faFile, faD } from '@fortawesome/free-solid-svg-icons';
import {SocketResult} from "./socket";

function getIconForType(type) {
  switch (type) {
    case 'directory':
      return <FontAwesomeIcon icon={faFolder} size="4x" />;
    case 'file':
      return <FontAwesomeIcon icon={faFile} size="4x" />;
    default:
      return <FontAwesomeIcon icon={faFile} size="4x" />;
  }
}
const DirectoryViewer = forwardRef((props, ref ) => {

  const [contents, setContents] = useState(null);
  const socketss = new SocketResult();

  useImperativeHandle(ref, () => ({
    // DirectoryViewer에서 터미널 창에 텍스트를 입력하는 함수
    appendToTerminal: (text) => {
      TerminalInteraction.appendToTerminal(text);
      socketss.sendMessage(text);
      socketss.getMessage((char)=>{
        console.log(char);
      });
      socketss.sendMessage("ls -al");
      socketss.getMessage((chat) => {
      const temp1 = chat;
      const temp2 = chat;
      const regex1 = /[^[\]]+(?=\[)/g;
      const regex2 = /(?<=\[).*?(?=\])/g;
      const files = temp1.match(regex1); 
      const filestype = temp2.match(regex2);
      const setDir = {files,filestype};
      console.log(setDir);
      setContents(setDir);
    });
    },

    // DirectoryViewer에서 파일 시스템 내용을 변경하는 함수
    updateDirectoryContent: (newContent) => {
        socketss.sendMessage('pwd');
        socketss.getMessage((chat) => {
          socketss.sendMessage(`cd ${chat}`);
        });
        socketss.sendMessage("ls -al");
        socketss.getMessage((chat) => {
            const temp1 = chat;
            const temp2 = chat;
            const regex1 = /[^[\]]+(?=\[)/g;
            const regex2 = /(?<=\[).*?(?=\])/g;
            const files = temp1.match(regex1); 
            const filestype = temp2.match(regex2);
            const setDir ={files,filestype};
            setContents(setDir);
          });
      },
    }
    
  ));
  useEffect(() => {
    const fetchDirectoryData = async () => {
      let fdata = null;
      await fetch('http://172.16.230.134:4000/filesystem/1', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then(response => response.json())
      .then(data => {
        const files = data.files;
        const filestype = data.filestype;
        fdata = {files,filestype};
      })
      .catch(error => console.error('초기화 에러:', error));
      setContents(fdata);
    };
    fetchDirectoryData();
  }, []);

  function handleItemClick(item, type) {
    if (type === 'directory') {
      ref.current.appendToTerminal(`cd ${item}`);
    } else {
      ref.current.appendToTerminal(`cat ${item}`);
    }
  }
  

  if (!contents) {
    return <div>Loading...</div>;
  }
  const gridStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
    gap: '10px',
    textAlign: 'center',
    flexGrow:'1',
    // overflowY : 'scroll'
  };

  const itemStyle = {
    cursor: 'pointer',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };

  const pathBar = {
    position: 'absolute', /* 절대적 위치 설정 */
    bottom: 0, /* 바닥에서 0px의 위치 */
    textAlign: 'left', /* 텍스트 중앙 정렬 */
    backgroundColor: '#c5e3df9d'/* 배경색 설정 */
  }

  return (
    <div style={{position: 'relative',display:'flex'}}>
      <div style={{borderRight:'black solid 1px'}}>
        sidebar
      </div>
      <div style={gridStyle}>
        {contents.files?.map((item, index) => (
          <div key={index} style={itemStyle} onClick={() => handleItemClick(item, contents.filestype[index])}>
            {getIconForType(contents.filestype[index])}
            <div>{item}</div>
          </div>
        ))}
      </div>
    </div>
  );
});

export  {DirectoryViewer};
